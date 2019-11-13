import { Controller, Post, Body, Param, Put, Get, Delete, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { AuthUser } from 'src/common/decorators/auth-user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { User } from 'src/user/user.entity';

@UseGuards(JwtGuard)
@Controller('/orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Roles('SUPER_ADMIN')
  @Post('/')
  async create(@Body() orderData) {
    return this.orderService.create(orderData);
  }

  @Roles('SUPER_ADMIN')
  @Get('/')
  async getAll() {
    return this.orderService.getAll();
  }

  @Get('/available')
  async getAvailable() {
    return this.orderService.getAvailable();
  }

  @Get('/processing')
  async getProcessing(@AuthUser() user: User) {
    return this.orderService.getProcessing(user);
  }

  @Put('/processing/close')
  async closeProcessing(@AuthUser() user: User ) {
    return this.orderService.closeProcessing(user);
  }

  @Put('/process/:id')
  async process(@Param('id') id, @AuthUser() user: User ) {
    return this.orderService.process(user, id);
  }

  @Roles('SUPER_ADMIN')
  @Delete('/:id')
  async delete(@Param('id') id) {
    return this.orderService.delete(id);
  }

}
