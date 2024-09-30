import { Controller, Get } from '@nestjs/common';
import { User } from './schemas';
import { UserService } from './user.service';

@Controller()
export class UserController {
  #_service: UserService;

  constructor(service: UserService) {
    this.#_service = service;
  }

  @Get()
  async getUsers(): Promise<User[]> {
    return await this.#_service.getAllUsers();
  }
}
