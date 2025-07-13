import { Destinations } from 'src/destinations/destinations.Entity';
import { User } from 'src/user/user.Entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Destination_Comment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;

  @Column({ type: 'varchar', length: 255 })
  comment: string;

  @ManyToOne(() => Destinations, (destination) => destination.destinations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'destinationId' })
  destinations: Destinations;

  @Column()
  destinationId: number;

  @OneToOne(() => User, (user) => user.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;
}
