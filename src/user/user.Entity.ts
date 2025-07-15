import { Destination_Comment } from 'src/destination_comment/destination_comment.Entity';
import { Destinations } from 'src/destinations/destinations.Entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column({ unique: true })
  userId: string;

  @Column({ select: false })
  password: string;

  @Column({ type: 'varchar', nullable: true })
  profilePhoto: string | null;

  @Column()
  age: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;

  @Column()
  gender: string;

  @Column()
  state: string;

  @OneToMany(() => Destinations, (destinations) => destinations.user, {
    onDelete: 'CASCADE',
  })
  destinations: Destinations[]; // User와 Destinations 간의 일대다 관계 설정

  @OneToMany(
    () => Destination_Comment,
    (destinationComment) => destinationComment.user,
    {
      onDelete: 'CASCADE',
    },
  )
  destinationComments: Destination_Comment[]; // User와 Destination_Comment 간의 일대
}
