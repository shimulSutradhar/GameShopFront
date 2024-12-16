import { NextApiHandler, NextApiRequest } from "next";
import formidable from "formidable";
import path from "path";

export const config = {
    api: {
        bodyParser: false,
    },
};

const readFile = (
    req: NextApiRequest,
    saveLocally?: boolean
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
    const options: formidable.Options = {};
    if (saveLocally) {
        options.uploadDir = path.join(process.cwd(), "/public/games");
        options.filename = (name, ext, path, form) => {
            return Date.now().toString() + "_" + path.originalFilename;
        };
    }
    options.maxFileSize = 4000 * 1024 * 1024;
    const form = formidable(options);
    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            resolve({ fields, files });
        });
    });
};

const handler: NextApiHandler = async (req, res) => {

    if (req.method === 'POST') {
        try {
            const { files } = await readFile(req, true);
            const { image } = files;
            const newImage = image?.length ? image[0] : image;
            return res.status(200).json({ success: true, newImage });
        } catch (error) {
            return res.status(500).json({ error: 'Server error.' });
        }
    } else {
        return res.status(405).json({ error: 'Method not allowed.' });
    }
};

export default handler;