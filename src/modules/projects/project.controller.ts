import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from './model';
import { CreateProjectDto } from './dtos';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UploadService } from 'src/upload';

@ApiTags('Project')
@Controller('projects')
export class ProjectController {
  #_service: ProjectService;
  #_uploadFile: UploadService;

  constructor(service: ProjectService) {
    this.#_service = service;
  }

  //! GET
  @ApiOperation({ summary: 'Barcha projectlarni olish' })
  @Get()
  async getAllProjects(): Promise<Project[]> {
    return await this.#_service.getAllProject();
  }

  //! POST
  @ApiOperation({ summary: 'Project yaratish' })
  @ApiConsumes('multipart/form-data')
  @Post('/add')
  @UseInterceptors(FileInterceptor('image'))
  async creteProject(
    @Body() createProjectPayload: CreateProjectDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<void> {
    await this.#_service.createProject({
      ...createProjectPayload,
      image: image,
    });
    // return 'creted success';
  }

  //! UPADATE

  // ! DELETE
  @Delete('/delete/:projectId')
  async deleteProject(
    @Param('projectId', ParseIntPipe) projectId: number,
  ): Promise<void> {
    await this.#_service.deleteProject(projectId);
  }
}
