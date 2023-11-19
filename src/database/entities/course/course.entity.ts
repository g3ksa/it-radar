import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "../category/category.entity";
import { Review } from "../review/review.entity";
import { Company } from "../company/company.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity('Courses')
export class Course {
  @PrimaryGeneratedColumn()
  @ApiProperty({ type: Number, description: 'Course id' })
  id: number

  @Column()
  @ApiProperty({ type: String, description: 'Course name' })
  name: string

  @Column()
  @ApiProperty({ type: String, description: 'Course description' })
  description: string

  @Column()
  @ApiProperty({ type: Number, description: 'Course price' })
  price: number

  @Column()
  @ApiProperty({ type: Number, description: 'Course time frame' })
  timeframe: number

  @ManyToMany(() => Category, category => category.code, 
    {
      cascade: true,
      nullable: true
    }
  )
  @ApiProperty({ type: Category, description: 'Course categories', isArray: true })
  categories: Array<Category>

  @OneToMany(() => Review, review => review.id)
  @ApiProperty({ type: () => Review, description: 'Course reviews', isArray: true })
  reviews: Array<Review>

  @ManyToOne(() => Company, company => company.id)
  @ApiProperty({ type: () => Company, description: 'Course company' })
  company: Company
}
