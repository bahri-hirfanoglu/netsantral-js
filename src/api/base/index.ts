import axios, { AxiosInstance } from 'axios';
import { RequestDto } from '../../dtos/request.dto';
import config from '../../config/api.config';
import { validate } from 'class-validator';

export class Base {
  options: RequestDto;
  api: AxiosInstance;

  constructor(options: RequestDto) {
    this.options = options;
    this.api = this.InitAxios();
  }

  /**
   *
   * @param status
   * @param value
   * @param key
   * @returns
   */
  private response(status: boolean, value: any, key: string = 'message') {
    return { status, [key]: value };
  }

  /**
   *
   * @param data
   * @returns
   */
  private handleResponse(data: any) {
    const status = data.hasOwnProperty('status')
      ? data.status == 'Success'
      : true;
    if (status)
      ['response', 'status', 'message'].forEach((item) => delete data[item]);
    const value = status ? data : data?.message;
    const key: string = status ? 'data' : 'message';
    return this.response(status, value, key);
  }

  /**
   * DTO validation processes
   * @param dto
   */
  async validateDto(dto: any): Promise<void> {
    const errors = await validate(dto);
    if (errors.length) {
      throw new Error(`Parameters validation errors: ${errors}`);
    }
  }
  /**
   * API request execution process
   * @param endpoint
   * @param body
   */
  async sendApiRequest(endpoint: string, body: any): Promise<any> {
    try {
      const response = await this.api.post(endpoint, body);
      return this.handleResponse(response.data);
    } catch (error) {
      throw new Error(`Error in request to ${endpoint}: ${error}`);
    }
  }

  /**
   * Validate DTO, execute a pre-request function, and send an API request.
   * @param dto Data transfer object.
   * @param endpoint API endpoint.
   * @param DtoClass The class of the DTO to be used.
   * @param beforeRequest Optional function to execute before sending the request.
   */
  public async validateAndSend(
    dto: any,
    endpoint: string,
    DtoClass: any,
    beforeRequest?: (body: any) => void,
  ): Promise<any> {
    await this.validateDto(dto);
    const body = new DtoClass(dto);

    if (beforeRequest) {
      beforeRequest(body);
    }

    return this.sendApiRequest(endpoint, body);
  }

  /**
   *
   * @param options
   * @returns
   */
  private InitAxios() {
    const api = axios.create({
      baseURL: `${this.options.baseUrl ?? config.BASE_URL}/${
        this.options.username
      }`,
    });

    api.interceptors.request.use(
      (config) => {
        if (config.data) {
          config.data = {
            ...{
              username: this.options.username,
              password: this.options.password,
            },
            ...config.data,
          };
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
    return api;
  }
}
