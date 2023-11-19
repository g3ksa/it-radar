import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from 'src/database/entities/review/review.entity';
import { Repository } from 'typeorm';
import { ReviewDto } from './models/review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewsRepository: Repository<Review>
  ) {}

  async createReview(req: ReviewDto): Promise<Review> {
    return this.reviewsRepository.save({
      text: req.text,
      author: {
        id: req.authorId
      },
      course: {
        id: req.courseId
      }
    })
  }

  async editReview(req: ReviewDto): Promise<Review> {
    return this.reviewsRepository.save(req)
  }

  async deleteReview(id: number): Promise<any> {
    return this.reviewsRepository.delete(id)
  }

  async getOneReview(id: number): Promise<Review> {
    return this.reviewsRepository.findOne({
      where: {
        id
      },
      relations: {
        author: true,
        course: true
      }
    })
  }

  async getAllByCourseId(courseId: number): Promise<Review[]> {
    return this.reviewsRepository.find({
      where: {
        course: {
          id: courseId
        }
      },
      relations: {
        author: true,
        course: true
      }
    })
  }
}
