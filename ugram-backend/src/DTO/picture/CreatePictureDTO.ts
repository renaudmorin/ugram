import {
  IsAlphanumeric,
  IsArray,
  IsDateString,
  IsUrl,
  Length,
} from 'class-validator';
import {
  IsNotEmptyOrWhitespace,
  IsStringArrayUniqueValues,
} from 'src/validators/CustomClassValidators';
import { Comment } from 'src/DTO/picture/comment.model';

export class CreatePictureDto {
  @IsUrl(undefined, { message: 'The provided picture url is invalid' })
  pictureUrl: string;

  @IsAlphanumeric(undefined, {
    message: 'The user id should be a 24 character long alphanumeric value',
  })
  @Length(24, 24, {
    message: 'The user id should be a 24 character long alphanumeric value',
  })
  userId: string;

  description: string;

  @IsArray({ message: 'The hashtags should be an array of string values' })
  @IsNotEmptyOrWhitespace({
    each: true,
    message: 'Each hashtag should contain at least one character',
  })
  @IsStringArrayUniqueValues()
  hashtags: string[];

  @IsArray({ message: 'The mentions should be an array of string values' })
  @IsNotEmptyOrWhitespace({
    each: true,
    message: 'Each mention should contain at least one character',
  })
  @IsStringArrayUniqueValues()
  mentions: string[];

  @IsDateString(undefined, { message: 'The provided creation date is invalid' })
  creationDate: Date;

  @IsArray({ message: 'The likes should be an array of string values' })
  @IsNotEmptyOrWhitespace({
    each: true,
    message: 'Each like should contain at least one character',
  })
  @IsStringArrayUniqueValues()
  likes: string[];

  comments: Comment[];
}
