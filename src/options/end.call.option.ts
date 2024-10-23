import { EndCallDto } from "../dtos/end.call.dto";

export class EndCallOption {
  uniqueId: string;
  crmId: Number;

  constructor(options: EndCallDto) {
    this.uniqueId = options.uniqueId;
    this.crmId = options.crmId;
  }
}
