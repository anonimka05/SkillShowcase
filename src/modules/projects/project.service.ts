import { InjectModel } from '@nestjs/sequelize';
import { Project } from './model';
import { CreateProjectRequest } from './interface';
import { UploadService } from 'src/upload';

export class ProjectService {
  constructor(
    @InjectModel(Project) private projectModel: typeof Project,
    private readonly uploadService: UploadService,
  ) {}

  async getAllProject(): Promise<Project[]> {
    return await this.projectModel.findAll();
  }

  // async createProject(payload: CreateProjectRequest): Promise<void> {
  //   const fileOptions = await this.uploadService.uploadFile({
  //     file: payload.image,
  //     destination: 'uploads/projects',
  //   });

  //   await this.projectModel.create({
  //     title: payload.title,
  //     image: fileOptions.imageUrl,
  //     userId: payload.userId,
  //     categoryId: payload.categoryId,
  //   });
  // }

  async createProject(payload: CreateProjectRequest): Promise<void> {
    const userExists = await this.projectModel.findByPk(payload.userId);
    if (!userExists) {
      throw new Error(`User with ID ${payload.userId} does not exist`);
    }

    const fileOptions = await this.uploadService.uploadFile({
      file: payload.image,
      destination: 'uploads/projects',
    });

    await this.projectModel.create({
      title: payload.title,
      image: fileOptions.imageUrl,
      userId: payload.userId,
      categoryId: payload.categoryId,
    });
  }

  async deleteProject(id: number): Promise<void> {
    const foundedProject = await this.projectModel.findByPk(id);

    await this.uploadService.deleteFile({ fileName: foundedProject.image });

    await this.projectModel.destroy({ where: { id } });
  }
}
