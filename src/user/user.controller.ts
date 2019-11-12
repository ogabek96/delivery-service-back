import { Controller, Get, Post, Put, Param, Delete, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  async create(@Body() userData) {
    return this.userService.create(userData);
  }
  @Get()
  async getAll() {
    return this.userService.getAll();
  }
  @Get(':id')
  async getById(@Param('id') id) {
    return this.userService.getById(id);
  }
  @Put(':id')
  async update(@Param('id') id, userData) {
    return this.userService.update(id, userData);
  }
  @Delete(':id')
  async delete(@Param('id') id) {
    return this.userService.delete(id);
  }
}
