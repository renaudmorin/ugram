import { Transform } from 'class-transformer';
import { IsNumberString, IsOptional } from 'class-validator';

export class GetMatchingDescriptionsDTO {
  @Transform(({ value }) => (value == '' ? undefined : value))
  @IsOptional()
  @IsNumberString(
    { no_symbols: true },
    { message: 'The limit has to be a positive integer' },
  )
  limit: string;

  @IsOptional()
  desc: string;
}
