import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

/**
 * Kuyruk durum bilgisini almak için gereken parametreler
 */
export class QueueStatsDto {
  @IsNotEmpty()
  @IsString()
  queue: string;

  @IsOptional()
  @IsNumber()
  crm_id?: Number;

  constructor(partial?: Partial<QueueStatsDto>) {
    this.crm_id = partial?.crm_id ?? 1;
    Object.assign(this, partial);
  }
}
