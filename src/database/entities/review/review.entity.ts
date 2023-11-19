import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user.entity";
import { Course } from "../course/course.entity";

@Entity('Reviews')
export class Review {
  @PrimaryGeneratedColumn()
  id: number

  @Column({type: 'text'})
  text: string

  @ManyToOne(() => User, user => user.id)
  user: User

  @ManyToOne(() => Course, course => course.id)
  course: Course
}
