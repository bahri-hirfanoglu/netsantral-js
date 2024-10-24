import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

/**
 * Çağrı transfer etmek gereken parametreler.
 */
export class TransferCallDto {
  @IsNotEmpty()
  @IsString()
  unique_id: string;

  @IsNumber()
  crm_id: Number;

  @IsString()
  @IsNotEmpty()
  exten: string;

  @IsString()
  @IsIn(['xfer', 'atxfer'], {
    message: 'type must be one of: xfer, atxfer',
  })
  type: string;
}
