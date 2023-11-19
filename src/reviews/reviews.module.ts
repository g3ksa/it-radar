import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from 'src/database/entities/review/review.entity';

@Module({
  providers: [ReviewsService],
  controllers: [ReviewsController],
  imports: [
    TypeOrmModule.forFeature([Review])
  ]
})
export class ReviewsModule {}
