import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

/**
 * Arama başlatmak için gereken parametreler.
 */
export class StartCallDto {
  @IsString()
  @IsNotEmpty()
  customer_num: string;

  @IsString()
  @IsNotEmpty()
  internal_num: string;

  @IsString()
  @IsNotEmpty()
  trunk: string;

  @IsString()
  pbxnum?: string;

  @IsOptional()
  @IsNumber()
  ring_timeout?: number;

  @IsOptional()
  @IsNumber()
  crm_id?: Number;

  @IsOptional()
  @IsString()
  originate_order?: string;

  @IsOptional()
  @IsNumber()
  wait_response?: Number;

  constructor(partial?: Partial<StartCallDto>) {
    this.ring_timeout = partial?.ring_timeout ?? 20;
    this.crm_id = partial?.crm_id ?? 1;
    this.wait_response = partial?.wait_response ?? 1;
    this.originate_order = partial?.originate_order ?? 'of';
    this.pbxnum = partial?.pbxnum ?? partial?.trunk;
    Object.assign(this, partial);
  }
}
