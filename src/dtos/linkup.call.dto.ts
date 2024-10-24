import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

/**
 * Çağrı bağlamak için gereken parametreler.
 */
export class LinkupCallDto {
  @IsString()
  @IsNotEmpty()
  caller: string;

  @IsString()
  @IsNotEmpty()
  called: string;

  @IsString()
  @IsNotEmpty()
  trunk: string;

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

  constructor(partial?: Partial<LinkupCallDto>) {
    this.ring_timeout = partial?.ring_timeout ?? 20;
    this.crm_id = partial?.crm_id ?? 1;
    this.wait_response = partial?.wait_response ?? 1;
    this.originate_order = partial?.originate_order ?? 'of';
    Object.assign(this, partial);
  }
}
