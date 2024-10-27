import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

/**
 * Dinamik bir arama başlatıp yönlendirme yapmak için kullanılacak parametreler
 */
export class DynamicRedirect {
  @IsString()
  @IsNotEmpty()
  called: string;

  @IsString()
  @IsNotEmpty()
  redirect_menu: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['ivr', 'queue', 'announcement'], {
    message: 'redirect_type must be one of: ivr, queue, announcement',
  })
  redirect_type: string;

  @IsString()
  @IsNotEmpty()
  trunk: string;

  @IsOptional()
  @IsNumber()
  wait_response?: Number;

  @IsOptional()
  @IsNumber()
  ring_timeout?: number;

  @IsOptional()
  @IsNumber()
  crm_id?: Number;

  constructor(partial?: Partial<DynamicRedirect>) {
    this.ring_timeout = partial?.ring_timeout ?? 20;
    this.crm_id = partial?.crm_id ?? 1;
    this.wait_response = partial?.wait_response ?? 1;
    Object.assign(this, partial);
  }
}
