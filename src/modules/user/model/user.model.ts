import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript';
import { Project } from 'src/modules/projects';

@Table({ tableName: 'users', timestamps: true })
export class User extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.TEXT, allowNull: false })
  name: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  phone: string;

  @HasMany(() => Project)
  projects: Project[];
}
