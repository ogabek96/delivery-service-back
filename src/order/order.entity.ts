import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  location: string;

  @Column({ length: 20 })
  price: string;

  @Column()
  status: string;

  @Column()
  createdDate: Date;

  @ManyToOne(type => User, user => user.order)
  @JoinColumn()
  user: User;
}
