import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './model/category.model';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Category')
@Controller('categories')
export class CategoryController {
  #_service: CategoryService;

  constructor(private readonly service: CategoryService) {
    this.#_service = service;
  }
  @ApiOperation({ summary: 'Barcha categorylarni olish' })
  @Get()
  async getCategories(): Promise<Category[]> {
    return this.#_service.getAllCategories();
  }

  @ApiOperation({ summary: 'Project yaratish' })
  @Post('/add')
  async createCategory(@Body() category: CreateCategoryDto): Promise<any> {
    return this.#_service.createCategory(category);
  }

  @ApiOperation({ summary: 'Project malumotlarini ozgartirish' })
  @Put('update/:categoryId')
  async updateCategory(
    @Body() category: UpdateCategoryDto,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ): Promise<string> {
    this.#_service.updateCategory(category, categoryId);
    return 'updated successfully';
  }

  @ApiOperation({ summary: 'Project malumotlarini ochirish' })
  @Delete('/delete/:categoryId')
  async deleteCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ): Promise<string> {
    await this.#_service.deleteCategory(categoryId);
    return 'deleted successfully';
  }
}
