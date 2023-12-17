import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/database/entities/course/course.entity';
import { Repository } from 'typeorm';
import { GetCoursesQuery } from './models/getCoursesQuery';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly coursesRepository: Repository<Course>,
  ) {}

  async findAll(query: GetCoursesQuery): Promise<Course[]> {
    if (query.companyId) {
      return this.coursesRepository.find({
        where: {
          company: {
            id: query.companyId,
          },
        },
        relations: {
          company: true,
        },
      });
    }
    return this.coursesRepository.find();
  }

  async findOne(courseId: number): Promise<Course> {
    return this.coursesRepository.findOne({
      where: {
        id: courseId,
      },
      relations: {
        company: true,
        reviews: {
          author: true,
        },
        keyPhrases: true,
      },
    });
  }
}
