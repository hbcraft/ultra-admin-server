/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<ExcludeKey<User, 'password'> | null> {
    const user = await this.userRepository.findOneBy({ id });
    if (user !== null) {
      const { password, ...userInfo } = user;
      return userInfo;
    }
    return user;
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete({ id });
  }
}
