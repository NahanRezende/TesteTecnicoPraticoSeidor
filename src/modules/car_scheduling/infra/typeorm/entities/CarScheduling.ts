import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Driver } from '../../../../driver/infra/typeorm/entities/Driver';
import { Car } from '../../../../car/infra/typeorm/entities/Car';

@Entity('car_scheduling')
export class CarScheduling {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  start_date_of_use: Date;

  @Column({ nullable: true })
  end_date_of_use: Date;

  @Column()
  reason_for_use: string;

  @Column()
  driver_id: string;

  @ManyToOne(() => Driver)
  @JoinColumn({ name: 'driver_id' })
  driver: Driver;

  @Column()
  car_id: string;

  @ManyToOne(() => Car)
  @JoinColumn({ name: 'car_id' })
  car: Car;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
