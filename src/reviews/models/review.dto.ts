import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ReviewDto {
  @ApiProperty({ type: Number, description: 'Review id. Empty if creating', required: false })
  id?: number

  @ApiProperty({ type: String, description: 'Review text' })
  @IsString()
  @IsNotEmpty()
  text: string

  @ApiProperty({ type: Number, description: 'Course id' })
  @IsNotEmpty()
  @IsNumber()
  courseId: number

  @ApiProperty({ type: Number, description: 'Author id' })
  @IsNotEmpty()
  @IsNumber()
  authorId: number
}
