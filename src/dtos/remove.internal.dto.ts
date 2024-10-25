import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

/**
 * Kuyruktan dahili çıkarmak için gerekli parametreler
 */
export class RemoveInternalDto {
  @IsNotEmpty()
  @IsString()
  queue: string;

  @IsString()
  exten: String;

  @IsOptional()
  @IsNumber()
  crm_id?: Number;

  constructor(partial?: Partial<RemoveInternalDto>) {
    this.crm_id = partial?.crm_id ?? 1;
    Object.assign(this, partial);
  }
}
