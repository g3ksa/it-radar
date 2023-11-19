import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "../course/course.entity";
import { Review } from "../review/review.entity";

@Entity('Users')
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  email: string

  @Column()
  password: string

  @Column({ nullable: true })
  hashedRt: string

  @OneToMany(() => Course, course => course.id)
  favoriteCourses: Array<Course>

  @OneToMany(() => Review, review => review.id)
  reviws: Array<Review>
}
