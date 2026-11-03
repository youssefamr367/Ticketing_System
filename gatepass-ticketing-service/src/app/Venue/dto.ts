import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsInt,
  Min,
  IsEnum,
  IsOptional,
  IsBoolean,
  Max,
  IsPositive,
} from "class-validator";

export class CreateVenueDTO {
  @IsString()
  @IsNotEmpty()
  neeme!: string;

  @IsString()
  @IsNotEmpty()
  city!: string;

  @IsNumber()
  @IsPositive()
  capacity!: string;
}
