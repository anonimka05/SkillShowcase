import {
  Body,
  Controller,
  Delete,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadedFileResponse } from './interface';
import { UploadFileDto } from './dtos';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  DeleteFileUploadRequest,
  DeleteUploadFileResponse,
} from './interface/delete-file.interface';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Uploads')
@Controller('uploads')
export class UploadController {
  constructor(private service: UploadService) {}

  @ApiOperation({ summary: 'Barcha upload-larni olish' })
  @Post('/add')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Body() payload: UploadFileDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UploadedFileResponse> {
    return await this.service.uploadFile({ ...payload, file });
  }

  //  ! files yuklash qismi tugatilmadi
  //   @Post('/add')
  //   @UseInterceptors(FileInterceptor('file'))
  //   async uploadFiles(
  //     @Body() payload: UploadFileDto,
  //     @UploadedFile() file: Express.Multer.File,
  //   ): Promise<UploadedFilesResponse> {
  //     return await this.service.uploadFiles({ ...payload, file });
  //   }

  @ApiOperation({ summary: 'Upload malumotlarini ochirish' })
  @Delete('/remove')
  async removeFile(
    @Body() payload: DeleteFileUploadRequest,
  ): Promise<DeleteUploadFileResponse> {
    return this.service.deleteFile(payload);
  }
}
