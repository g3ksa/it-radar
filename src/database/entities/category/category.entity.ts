import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('Categories')
export class Category {
  @PrimaryColumn()
  code: string

  @Column()
  name: string
}
