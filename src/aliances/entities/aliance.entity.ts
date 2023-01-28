import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Aliance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  name: string;

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

  @BeforeInsert()
  checkNameInsert() {
    this.name = this.name.toUpperCase();
  }

  @BeforeUpdate()
  checkNameUpdate() {
    this.name = this.name.toUpperCase();
  }
}
