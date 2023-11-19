import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "../category/category.entity";
import { Review } from "../review/review.entity";
import { Company } from "../company/company.entity";

@Entity('Courses')
export class Course {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  description: string

  @Column()
  price: number

  @Column()
  timeframe: number

  @ManyToMany(() => Category, category => category.code, 
    {
      cascade: true,
      nullable: true
    }
  )
  categories: Array<Category>

  @OneToMany(() => Review, review => review.id)
  reviews: Array<Review>

  @ManyToOne(() => Company, company => company.id)
  company: Company
}
