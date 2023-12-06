/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('all')
  getAllUsers() {
    return this.userService.findAll();
  }

  @Get(':userId')
  getUserById(@Param('userId') userId: number) {
    return this.userService.findOne(userId);
  }
}
