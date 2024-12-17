import { PutObjectCommandInput, S3 } from "@aws-sdk/client-s3";
import { IUpload } from "./types";

class imageUploader implements IUpload {
  static upload(image: any, arg1: string) {
      throw new Error('Method not implemented.');
  }
  readonly s3Client: S3;
  readonly bucket: string;
  constructor() {
    this.s3Client = new S3({
      endpoint: "https://nyc3.digitaloceanspaces.com",
      region: "us-east-1",
      credentials: {
        accessKeyId: "DO801R8K4EMW2KYRRLYC",
        secretAccessKey: "au3xVZScp+DifTMt5qM+MsQy2aB8yfqUPX6grUdKYug",
      },
    });
    this.bucket = "thesis-gamestopre";
  }

  async upload(blobUrl: any, path: string = ""): Promise<string> {
    let file = await fetch(blobUrl).then((r) => r.blob());
    console.log("file:", file.type);
    const bucketParams: PutObjectCommandInput = {
      Bucket: this.bucket,
      Key: path.startsWith("/") ? path.slice(1) : path,
      Body: file,
      ACL: "public-read",   
      ContentType: file.type,
    };

    // console.log("bucketParams:", bucketParams);
    await this.s3Client.putObject(bucketParams).then((value) => {
      console.log("value", value);
    }).catch(err=> console.log("error:", err));

    return `https://${this.bucket}.nyc3.digitaloceanspaces.com/${bucketParams.Key}`;
  }
}

export default imageUploader;