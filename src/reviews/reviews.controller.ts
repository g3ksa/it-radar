import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewDto } from './models/review.dto';
import { Review } from 'src/database/entities/review/review.entity';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Reviews')
@Controller('api/reviews')
@UseGuards(AuthGuard('jwt'))
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post('/create')
  @ApiOkResponse({
    description: 'Create review',
    type: Review,
    status: HttpStatus.CREATED,
  })
  async createReview(@Body() req: ReviewDto): Promise<Review> {
    return this.reviewsService.createReview(req);
  }

  @Post('/edit')
  @ApiOkResponse({
    description: 'Edit review',
    type: Review,
    status: HttpStatus.OK,
  })
  async editReview(@Body() req: ReviewDto): Promise<Review> {
    return this.reviewsService.editReview(req);
  }

  @Delete('/delete/:id')
  @ApiOkResponse({
    description: 'Delete review',
    type: Review,
    status: HttpStatus.OK,
  })
  async deleteReview(@Param('id') id: number): Promise<any> {
    return this.reviewsService.deleteReview(id);
  }

  @Get('/:id')
  @ApiOkResponse({
    description: 'Get one review',
    type: Review,
    status: HttpStatus.OK,
  })
  async getOneReview(@Param('id') id: number): Promise<Review> {
    return this.reviewsService.getOneReview(id);
  }

  @Get()
  @ApiOkResponse({
    description: 'Get all reviews by course id',
    type: Review,
    status: HttpStatus.OK,
    isArray: true,
  })
  async getAllByCourseId(
    @Query('courseId') courseId: number,
  ): Promise<Review[]> {
    return this.reviewsService.getAllByCourseId(courseId);
  }
}
