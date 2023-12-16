import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Course } from '../course/course.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('Reviews')
export class Review {
  @PrimaryGeneratedColumn()
  @ApiProperty({ type: Number, description: 'Review id' })
  id: number;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({ type: String, description: 'Review text' })
  text: string;

  @ManyToOne(() => User, (user) => user.id, { nullable: true })
  @ApiProperty({ type: () => User, description: 'Author', required: false })
  author: User;

  @ManyToOne(() => Course, (course) => course.id, { nullable: true })
  @ApiProperty({ type: () => Course, description: 'Course', required: false })
  course: Course;

  @CreateDateColumn({ nullable: true })
  @ApiProperty({ type: Date, description: 'Created at' })
  createdAt: Date;
}
