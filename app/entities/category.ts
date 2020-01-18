import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
    nullable: false,
  })
  name: string;
}
