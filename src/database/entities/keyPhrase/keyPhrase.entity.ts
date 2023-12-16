import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Course } from '../course/course.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('KeyPhrases')
export class KeyPhrase {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ type: 'text', nullable: true })
  @ApiProperty()
  text: string;

  @Column({ type: 'bool', nullable: true })
  @ApiProperty()
  isNegative: boolean;

  @ManyToOne(() => Course, (course) => course.id, { nullable: true })
  @ApiProperty({
    type: () => Course,
  })
  course: Course;
}
