import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "../course/course.entity";

@Entity('NeuralReviews')
export class NeuralReview {
  @PrimaryGeneratedColumn()
  id: number

  @Column({type: 'text'})
  text: string

  @Column({type: 'real'})
  emotion_grade: number

  @ManyToOne(() => Course, course => course.id)
  course: Course
}
