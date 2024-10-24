import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

/**
 * Çağrıyı sessize almak veya sessizden çıkarmak için gereken parametreler
 */
export class MuteCallDto {
  @IsOptional()  
  @IsNotEmpty()
  @IsString()
  unique_id?: string;

  @IsOptional()
  @IsNumber()
  crm_id?: Number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsIn(['all', 'in', 'out'], {
    message: 'direction must be one of: all, in, out',
  })
  direction?: string;

  @IsOptional()
  @IsString()
  @IsIn(['mute', 'unmute'], {
    message: 'state must be one of: mute, unmute',
  })
  state?: string

  constructor(partial?: Partial<MuteCallDto>) {
    this.direction = partial?.direction ?? "all";
    Object.assign(this, partial);
  }
}
