import { Aliance } from 'src/aliances/entities/aliance.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity({ name: 'members' })
export class Member extends User {
  @Column()
  nick_name: string;

  @Column()
  level: number;

  @Column()
  war_points: number;

  @Column()
  role: string;

  @ManyToOne(() => Aliance, (aliance) => aliance.members, {
    onDelete: 'CASCADE',
  })
  aliance: Aliance;
}
