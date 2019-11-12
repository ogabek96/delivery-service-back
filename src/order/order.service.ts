import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(@InjectRepository(Order)
  private readonly orderRepository: Repository<Order>) {}

  async create(order: Order) {
    return this.orderRepository.save(order);
  }
  async getAll() {
    return this.orderRepository.find();
  }
  async getById(id: string) {
    return this.orderRepository.findOne({id});
  }
  async update(id: string, order: Order) {
    const oldOrder = this.orderRepository.findOne({id});
    const updatedOrder = Object.assign(oldOrder, order);
    return this.orderRepository.save(updatedOrder);
  }
  async delete(id: string) {
    return this.orderRepository.delete({id});
  }
}
