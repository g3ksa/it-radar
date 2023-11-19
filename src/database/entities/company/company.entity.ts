import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('Companies')
export class Company {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({type: 'text'})
  description: string
}
