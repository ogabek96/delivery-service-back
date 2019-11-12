import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
  createdDate: string;
}
