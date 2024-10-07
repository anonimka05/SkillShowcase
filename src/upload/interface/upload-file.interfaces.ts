export declare interface UploadedFileRequest {
    file: Express.Multer.File
    destination: string
}

export  interface UploadedFileResponse {
    imageUrl: string
    message: string
}

export declare interface UploadedFilesRequest {
  file: Express.Multer.File[]
  destination: string
}

export interface UploadedFilesResponse {
  imageUrl: string[]
  message: string;
}
