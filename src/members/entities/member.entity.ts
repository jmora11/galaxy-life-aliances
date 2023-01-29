import { Aliance } from 'src/aliances/entities/aliance.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'members' })
export class Member {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  war_points: number;

  @Column()
  role: string;

  @ManyToOne(() => Aliance, (aliance) => aliance.members, {
    onDelete: 'CASCADE',
  })
  aliance: Aliance;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
