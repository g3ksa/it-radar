import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "../course/course.entity";
import { Review } from "../review/review.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity('Users')
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ type: Number, description: 'User id' })
  id: number

  @Column()
  @ApiProperty({ type: String, description: 'User first name' })
  firstName: string

  @Column()
  @ApiProperty({ type: String, description: 'User last name' })
  lastName: string

  @Column()
  @ApiProperty({ type: String, description: 'User email' })
  email: string

  @Column()
  @ApiProperty({ type: String, description: 'User password' })
  password: string

  @Column({ nullable: true })
  @ApiProperty({ type: String, description: 'User hashed refresh token' })
  hashedRt: string

  @OneToMany(() => Course, course => course.id)
  @ApiProperty({ type: () => Course, description: 'User favorite courses', isArray: true })
  favoriteCourses: Array<Course>

  @OneToMany(() => Review, review => review.id)
  @ApiProperty({ type: () => Review, description: 'User reviews', isArray: true })
  reviws: Array<Review>
}
