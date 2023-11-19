import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Course } from 'src/database/entities/course/course.entity';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetCoursesQuery } from './models/getCoursesQuery';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Courses')
@Controller('api/courses')
@UseGuards(AuthGuard('jwt'))
export class CoursesController {
  constructor(
    private readonly coursesService: CoursesService
  ) {}

  @Get()
  @ApiOkResponse({
    description: 'Get all courses',
    type: Course,
    status: HttpStatus.OK
  })
  async find(@Query() query: GetCoursesQuery): Promise<Array<Course>> {
    return this.coursesService.findAll(query);
  }
}
