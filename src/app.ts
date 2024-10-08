import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { appConfig, dbConfig } from './config';
import { User, UserModule } from '@modules';
import { Category } from './modules/category/model/category.model';
import { CategoryModule } from './modules/category/category.module';
import { Project, ProjectModule } from './modules/projects';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UploadModule } from './upload';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, dbConfig],
    }),
    ServeStaticModule.forRoot({
      serveRoot: './uploads',
      rootPath: './uploads',
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        try {
          return {
            dialect: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'psql',
            database: 'skillshowcase',
            // port: parseInt(process.env.DB_PORT),
            // host: process.env.DB_HOST,
            // dbName: process.env.DB_NAME,
            // password: process.env.DB_PASSWORD,
            // user: process.env.DB_USER,
            models: [Category, User, Project],
            synchronize: true,
            // sync: {force: true},
            logging: console.log,
            autoLoadModels: true,
          };
        } catch (error) {
          console.log(error);
        }
      },
    }),
    UserModule,
    CategoryModule,
    ProjectModule,
    UploadModule
  ],
})
export class AppModule {}
