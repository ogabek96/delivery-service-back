import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User)
  private readonly userRepository: Repository<User>) {}

  async create(user: User) {
    return this.userRepository.save(user);
  }
  async getAll() {
    return this.userRepository.find();
  }
  async getById(id: string) {
    return this.userRepository.findOne({id});
  }
  async update(id: string, user: User) {
    const oldUser = this.userRepository.findOne({id});
    const updatedUser = Object.assign(oldUser, user);
    return this.userRepository.save(updatedUser);
  }
  async delete(id) {
    return this.userRepository.delete({id});
  }
}
