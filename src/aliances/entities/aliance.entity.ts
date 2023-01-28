import { Member } from '../../members/entities/member.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'aliances' })
export class Aliance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  name: string;

  @OneToMany(() => Member, (member) => member.aliance, {
    cascade: true,
    eager: true,
  })
  members: Member[];

  @Column({
    type: 'text',
    default: 'normal',
  })
  status: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column('numeric', {
    default: 0,
  })
  level: number;

  @Column('numeric', {
    default: 0,
  })
  rank: number;

  @Column('numeric', {
    default: 0,
  })
  wars_won: number;

  @Column('numeric', {
    default: 0,
  })
  wars_lost: number;

  @Column('numeric', {
    default: 10000,
  })
  war_points_next_level: number;

  @Column('numeric', {
    default: 0,
  })
  war_points: number;

  @BeforeInsert()
  checkNameInsert() {
    this.name = this.name.toUpperCase();
  }

  @BeforeUpdate()
  checkNameUpdate() {
    this.name = this.name.toUpperCase();
  }
}
