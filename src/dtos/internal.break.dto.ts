import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

/**
 * Dahili mola durumunu değiştirmek için gereken parametreler
 */
export class InternalBreakDto {
  @IsNotEmpty()
  @IsString()
  queue: string;

  @IsString()
  exten: String;

  @IsString()
  reason?: String;

  @IsOptional()
  @IsNumber()
  paused?: Number;

  @IsOptional()
  @IsNumber()
  crm_id?: Number;

  constructor(partial?: Partial<InternalBreakDto>) {
    this.crm_id = partial?.crm_id ?? 1;
    this.reason = partial?.reason ?? "internal break";
    Object.assign(this, partial);
  }
}
