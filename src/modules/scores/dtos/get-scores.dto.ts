import { IsString, IsNotEmpty } from 'class-validator';

export class GetScoresDto {
  @IsString({ message: 'SBD must be a string' })
  @IsNotEmpty({ message: 'SBD is required' })
  sbd: string;
}
