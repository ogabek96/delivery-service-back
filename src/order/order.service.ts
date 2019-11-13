import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';

@Injectable()
export class OrderService {
  constructor(@InjectRepository(Order)
  private readonly orderRepository: Repository<Order>) { }

  async create(order: Order) {
    order.status = 'AVAILABLE';
    order.createdDate = new Date();
    return this.orderRepository.save(order);
  }
  async getAll() {
    return this.orderRepository.find({
      order: {
        createdDate: 'ASC',
      },
      relations: ['user'],
    });
  }
  async getById(id: string) {
    return this.orderRepository.findOne({ id });
  }
  async getAvailable() {
    return this.orderRepository.find({
      status: 'AVAILABLE',
    });
  }
  async update(id: string, order: Order) {
    const oldOrder = this.orderRepository.findOne({ id });
    const updatedOrder = Object.assign(oldOrder, order);
    return this.orderRepository.save(updatedOrder);
  }
  async process(user: User, orderId) {
    if ((await this.getProcessing(user)).info === 'empty') {
      const order = await this.orderRepository.findOne({ id: orderId });
      order.user = user;
      order.status = 'PROCESSING';
      return this.orderRepository.save(order);
    } else {
      return {
        error: 'You already have an order in processing, please close it first',
      };
    }
  }
  async getProcessing(user: User): Promise<any> {
    const order = await this.orderRepository.findOne({
      where: {
        status: 'PROCESSING',
        user,
      },
      relations: ['user'],
    });
    return order || { info: 'empty' };
  }
  async closeProcessing(user: User) {
    const order = await this.orderRepository.findOne({
      where: {
        status: 'PROCESSING',
        user,
      },
      relations: ['user'],
    });
    if (order) {
      order.status = 'CLOSED';
      return this.orderRepository.save(order);
    } else {
      return {
        error: 'You don\'t have an order in processing',
      };
    }

  }
  async delete(id: string) {
    return this.orderRepository.delete({ id });
  }
}
