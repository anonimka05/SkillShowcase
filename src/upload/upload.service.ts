import * as path from 'path';
import * as fs from 'fs/promises';
import {Injectable } from '@nestjs/common';
import { UploadedFileRequest, UploadedFileResponse } from './interface';
import { existsSync } from 'fs';
import { DeleteFileUploadRequest, DeleteUploadFileResponse } from './interface/delete-file.interface';

@Injectable()
export class UploadService {
  constructor() {}

  async uploadFile(
    payload: UploadedFileRequest,
  ): Promise<UploadedFileResponse> {
    // GENERATE UNIQUE FILE PATH
    const extName = path.extname(payload.file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileName = payload.file.fieldname + '-' + uniqueSuffix + extName;

    // GET FILE'S FULL PATH
    const fullFilePath = path.join(
      __dirname,
      '../../',
      payload.destination,
      fileName,
    );

    const isFileFolderExists = existsSync(
      path.join(__dirname, '../../', payload.destination),
    );

    // CREATE UPLOAD FOLDER IF DESTINATION IS NOT FOUND
    if (!isFileFolderExists) {
      fs.mkdir(path.join(__dirname, '../../', payload.destination));
    }

    // WRITTEN FILE TO DESTINATION
    await fs.writeFile(fullFilePath, payload.file.buffer);

    // CREATE IMAGE URL
    const imageUrl = `${payload.destination}/${fileName}`;

    return {
      imageUrl,
      message: 'File written successfully',
    };
  }

  //! kop file yuklash qismini bajarilishi kerak
  //   async uploadFiles(
  //     payload: UploadedFilesRequest,
  //   ): Promise<UploadedFilesResponse> {
  //     // GENERATE UNIQUE FILE PATH
  //     const extName = path.extname(payload.file.originalname);
  //     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  //     const fileName = payload.file.fieldname + '-' + uniqueSuffix + extName;

  //     // GET FILE'S FULL PATH
  //     const fullFilePath = path.join(
  //       __dirname,
  //       '../../',
  //       payload.destination,
  //       fileName,
  //     );

  //     const isFileFolderExists = existsSync(
  //       path.join(__dirname, '../../', payload.destination),
  //     );

  //     // CREATE UPLOAD FOLDER IF DESTINATION IS NOT FOUND
  //     if (!isFileFolderExists) {
  //       fs.mkdir(path.join(__dirname, '../../', payload.destination));
  //     }

  //     // WRITTEN FILE TO DESTINATION
  //     await fs.writeFile(fullFilePath, payload.file.);

  //     // CREATE IMAGE URL
  //     const imageUrl = `${payload.destination}/${fileName}`;

  //     return {
  //       message: 'File written successfully',
  //     };
  //   }

  async deleteFile(
    payload: DeleteFileUploadRequest,
  ): Promise<DeleteUploadFileResponse> {
    const filePath = path.join(__dirname, '../../', payload.fileName);

    const isFileExist = existsSync(filePath);

    if (isFileExist) {
      await fs.unlink(filePath);
    }

    return {
      message: 'File removed successfully',
    };
  }
}
