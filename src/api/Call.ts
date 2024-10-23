import axios from "axios";
import { RequestOptions } from "../options/request.option";
import { StartCallDto } from "../dtos/start.call.dto";
import { EndCallDto } from "../dtos/end.call.dto";
import { StartCallOption } from "../options/start.call.option";
import config from "../config/api.config";
import { EndCallOption } from "../options/end.call.option";

class Call {
  private baseUrl: string;
  private options: RequestOptions;

  constructor(options: RequestOptions) {
    this.options = options;
    this.baseUrl = `${options.baseUrl ?? config.BASE_URL}/${
      this.options.username
    }`;
  }

  /**
   * Bir arama başlatır.
   * @param options Arama başlatmak için gerekli seçenekler.
   */
  async initiateCall(dto: StartCallDto): Promise<any> {
    const options = new StartCallOption(dto);

    const url = `${this.baseUrl}/originate`;
    
    const params = {
      username: this.options.username,
      password: this.options.password,
      customer_num: options.customerNum,
      internal_num: options.internalNum,
      pbxnum: options.trunk,
      ring_timeout: options.ringTimeout,
      crm_id: options.crmId,
      wait_response: 1,
      originate_order: options.originateOrder ? "of" : "if",
      trunk: options.trunk
    };

    try {
      const response = await axios.get(url, { params });
      return response.data;
    } catch (error) {
      throw new Error(`Error initiating call: ${error}`);
    }
  }

  /**
   * Bir aramayı solandırır.
   * @param options Arama sonlandırmak için gerekli seçenekler.
   * @returns
   */
  async endCall(dto: EndCallDto): Promise<any> {
    const url = `${this.baseUrl}/hangup`;

    const options = new EndCallOption(dto);

    const params = {
      username: this.options.username,
      password: this.options.password,
      unique_id: options.uniqueId,
      crm_id: options.crmId,
    };

    try {
      const response = await axios.get(url, { params });
      return response.data;
    } catch (error) {
      throw new Error(`Error ending call: ${error}`);
    }
  }
}

export default Call;
