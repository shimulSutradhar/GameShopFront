export interface IUpload {
    upload(url: string, path: string): Promise<string>;
  }