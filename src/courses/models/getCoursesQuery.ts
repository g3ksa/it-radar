import { ApiOkResponse, ApiProperty } from "@nestjs/swagger";

export class GetCoursesQuery {
  @ApiProperty({ type: Number, description: 'Company id. Empty if need all', required: false })
  companyId?: number
}
