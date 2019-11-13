import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Order } from '../order/order.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 20 })
  login: string;

  @Column()
  password: string;

  @Column()
  roleCode: string;

  @OneToMany(type => Order, order => order.user)
  order: Order;
}
