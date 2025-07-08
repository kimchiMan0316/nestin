import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  username: string;

  @Column()
  userId: string;

  @Column()
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
}
