import { StartCallDto } from "../dtos/start.call.dto";

export class StartCallOption {
  customerNum: string;
  internalNum: string;
  trunk: string;
  ringTimeout: number;
  crmId: Number;
  originateOrder: boolean;

  constructor(options: StartCallDto) {
    this.customerNum = options.customerNum;
    this.internalNum = options.internalNum;
    this.trunk = options.trunk;

    this.ringTimeout = options.ringTimeout ?? 20;
    this.crmId = options.crmId ?? 1;
    this.originateOrder = options.originateOrder ?? true;
  }
}
