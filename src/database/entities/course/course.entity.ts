import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Review } from '../review/review.entity';
import { Company } from '../company/company.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('Courses')
export class Course {
  @PrimaryGeneratedColumn()
  @ApiProperty({ type: Number, description: 'Course id' })
  id: number;

  @Column({ nullable: true })
  @ApiProperty({ type: 'text', description: 'Course name' })
  name: string;

  @Column({ nullable: true })
  @ApiProperty({ type: String, description: 'Course description' })
  description: string;

  @Column({ nullable: true })
  @ApiProperty({ type: Number, description: 'Course price' })
  price: number;

  @Column({ nullable: true })
  @ApiProperty({ type: Number, description: 'Course time frame' })
  timeframe: number;

  @Column({ nullable: true, type: 'real' })
  @ApiProperty({ type: Number, description: 'Course rating' })
  rating: number;

  @OneToMany(() => Review, (review) => review.id)
  @ApiProperty({
    type: () => Review,
    description: 'Course reviews',
    isArray: true,
  })
  reviews: Array<Review>;

  @ManyToOne(() => Company, (company) => company.id)
  @ApiProperty({ type: () => Company, description: 'Course company' })
  company: Company;
}
