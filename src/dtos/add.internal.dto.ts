import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

/**
 * Kuyruğa dahili eklemek için gerekli parametreler
 */
export class AddInternalDto {
  @IsNotEmpty()
  @IsString()
  queue: string;

  @IsNumber()
  paused: Number;

  @IsString()
  exten: String;

  @IsOptional()
  @IsNumber()
  crm_id?: Number;

  @IsOptional()
  @IsNumber()
  penalty?: Number;

  constructor(partial?: Partial<AddInternalDto>) {
    this.crm_id = partial?.crm_id ?? 1;
    this.penalty = partial?.penalty ?? 1;
    Object.assign(this, partial);
  }
}
