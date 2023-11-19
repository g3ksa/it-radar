import { ApiProperty } from "@nestjs/swagger";

export class LoginResponse {
  @ApiProperty({ type: String, description: 'Access token' })
  accessToken: string
}
