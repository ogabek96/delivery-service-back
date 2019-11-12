import { Controller, Post, Body, Param, Put, Get, Delete } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}
  @Post('')
  async create(@Body() orderData) {
    return this.orderService.create(orderData);
  }
  @Get()
  async getAll() {
    return this.orderService.getAll();
  }
  @Get(':id')
  async getById(@Param('id') id) {
    return this.orderService.getById(id);
  }
  @Put(':id')
  async update(@Param('id') id, orderData) {
    return this.orderService.update(id, orderData);
  }
  @Delete(':id')
  async delete(@Param('id') id) {
    return this.orderService.delete(id);
  }
}
