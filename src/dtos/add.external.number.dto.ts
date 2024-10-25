import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

/**
 * Kuyruk durum bilgisini almak için gereken parametreler
 */
export class AddExternalNumberDto {
  @IsNotEmpty()
  @IsString()
  tenant: string;

  @IsNotEmpty()
  @IsString()
  queue: string;

  @IsNotEmpty()
  @IsString()
  no: string;

  @IsOptional()
  @IsString()
  command?: string;

  @IsOptional()
  @IsNumber()
  penalty?: number;

  constructor(partial?: Partial<AddExternalNumberDto>) {
    this.command = 'queueaddnumber';
    this.penalty = this.penalty ?? 1;
    Object.assign(this, partial);
  }
}
