import { IsNotEmpty, IsNumber, IsString } from "class-validator";

/**
 * Arama sonlandırma için gereken parametreler.
 */
export class EndCallDto {
  @IsNotEmpty()
  @IsString()
  unique_id: string;

  @IsNumber()
  crm_id: Number;
}
