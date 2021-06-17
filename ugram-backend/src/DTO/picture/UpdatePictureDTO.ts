import { IsArray, IsOptional, IsUrl } from 'class-validator';
import {
  IsNotEmptyOrWhitespace,
  IsStringArrayUniqueValues,
} from 'src/validators/CustomClassValidators';
import { Comment } from 'src/DTO/picture/comment.model';

export class UpdatePictureDto {
  @IsOptional()
  @IsUrl(undefined, { message: 'The provided picture url is invalid' })
  pictureUrl: string;

  @IsOptional()
  description: string;

  @IsOptional()
  @IsArray({ message: 'The hashtags should be an array of string values' })
  @IsNotEmptyOrWhitespace({
    each: true,
    message: 'Each hashtag should contain at least one character',
  })
  @IsStringArrayUniqueValues()
  hashtags: string[];

  @IsOptional()
  @IsArray({ message: 'The mentions should be an array of string values' })
  @IsNotEmptyOrWhitespace({
    each: true,
    message: 'Each mention should contain at least one character',
  })
  @IsStringArrayUniqueValues()
  mentions: string[];

  @IsOptional()
  @IsArray({ message: 'The likes should be an array of string values' })
  @IsNotEmptyOrWhitespace({
    each: true,
    message: 'Each like should contain at least one character',
  })
  @IsStringArrayUniqueValues()
  likes: string[];

  comments: Comment[];
}
