import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  nick_name: string;

  @Column('numeric', {
    default: 0,
  })
  level: number;

  @Column('numeric', {
    default: 1000,
  })
  points_next_level: number;

  @BeforeInsert()
  checkNameInsert() {
    this.nick_name = this.nick_name.toUpperCase();
  }

  @BeforeUpdate()
  checkNameUpdate() {
    this.nick_name = this.nick_name.toUpperCase();
  }
}
