import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './model';
import { UpdateUserRequest } from './interfaces/update-user.interface';
import { CreateUserRequest } from './interfaces';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  async getAllUsers(): Promise<User[]> {
    return await this.userModel.findAll();
  }

  async createUser(payload: CreateUserRequest): Promise<void> {
    const user = await this.userModel.create({
      name: payload.name,
      email: payload.email,
      password: payload.password,
      phone: payload.phone,
    });
  }

  async updateUser(payload: UpdateUserRequest): Promise<void> {
    await this.userModel.update({ ...payload }, { where: { id: payload.id } });
  }

  async deleteUser(id: number): Promise<void> {
    await this.userModel.destroy({
      where: { id },
    });
  }
}

//! MUHAMMAD SAID RAMAZON BUTIY - kitoblarini olish
// ? allohim nafsim va qalbim ortasidagi arosatda qoldim, meni ozing qutqar
// ? xarom sevgidan, xarom oydan ozing saqla, qalbim seni unutib ozgasini
// ? kirishiga yol qoyma, agar seni unutib birisini sevsam menga uni nasib etma
// https://www.youtube.com/watch?v=wB_7YzQglgw
// ? 1:45
// ? "ozimni topdim" - kitobi
// ? "iqror" - kitobi
// ? https://www.youtube.com/watch?v=2QBELxy5JoE
// ? aqlni rivojlantirish - kitob oqish, dono inson bilan suhbat 
// ? ruh - ruhiyat kuchayishi un 2 ta, 1. ibodat, 2. ehson 
// ! stivin kovin - muvofaqiyatli odamlarning 7 konikmasi
// ? risolai-qushola
// ? niyat qilganda sababini ham qilish kk, (nima uchun qilmoqchiman, bunga erishib nima qilaman)