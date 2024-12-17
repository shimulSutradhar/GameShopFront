// app/upload/route.ts
import { S3, PutObjectCommand } from "@aws-sdk/client-s3";
import { File } from "buffer";
import { NextResponse } from "next/server";

const s3Client = new S3({
    forcePathStyle: false,
    endpoint: 'https://nyc3.digitaloceanspaces.com',
    region: "us-east-1",
    credentials: {
        accessKeyId: "DO801R8K4EMW2KYRRLYC",
        secretAccessKey: "au3xVZScp+DifTMt5qM+MsQy2aB8yfqUPX6grUdKYug",
    },
});

export async function POST(req: Request) {
    try {
        const form = await req.formData();
        const file = form.get("file-input");

        if (!file) return NextResponse.json({ message: "failure" });

        const isFile = file instanceof File;

        if (!isFile) return NextResponse.json({ message: "failure" });

        const buffer = await file.arrayBuffer();

        const data = await s3Client.send(
            new PutObjectCommand({
                Bucket: "thesis-gamestopre",
                Key: "a-name-for-this-element",
                Body: Buffer.from(buffer),
            })
        );

        console.log(data);
        return NextResponse.json({ message: "success" });
    } catch (reason) {
        console.log(reason);
        return NextResponse.json({ message: "failure" });
    }
}