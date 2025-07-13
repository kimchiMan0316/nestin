import { User } from 'src/user/user.Entity';
import { Destination_Comment } from '../destination_comment/destination_comment.Entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Destinations {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  article: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;

  @Column()
  region: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column({ default: 0 })
  views: number;

  @ManyToOne(() => User, (user) => user.destinations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  @OneToMany(() => Destination_Comment, (comment) => comment.destinationId, {
    onDelete: 'CASCADE',
  })
  destinations: Destination_Comment[]; // User와 Destinations 간의 일대다 관계 설정
}
