import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { RequestDto } from '../../dtos/request.dto';
import config from '../../config/api.config';
import { validate } from 'class-validator';

export class Base {
  options: RequestDto;
  api: AxiosInstance;

  constructor(options: RequestDto) {
    this.options = options;
    this.api = this.createAxiosInstance({ baseURL: this.buildBaseURL() });
  }

  /**
   * Builds the base URL based on provided options or defaults.
   */
  private buildBaseURL(): string {
    return `${this.options.baseUrl ?? config.NETSANTRAL_API}`;
  }

  /**
   * Creates a new Axios instance with provided configuration.
   * @param config Custom Axios configuration.
   */
  private createAxiosInstance(config: AxiosRequestConfig): AxiosInstance {
    const api = axios.create(config);

    api.interceptors.request.use(
      (reqConfig) => {
        if (reqConfig.data) {
          reqConfig.data = {
            ...{
              username: this.options.username,
              password: this.options.password,
            },
            ...reqConfig.data,
          };
        }
        return reqConfig;
      },
      (error) => Promise.reject(error)
    );

    return api;
  }

  /**
   * Centralized response formatting.
   * @param status Success status.
   * @param value Response data or error message.
   * @param key Key to be used in the response object.
   */
  private response(status: boolean, value: any, key: string = 'message') {
    return { status, [key]: value };
  }

  /**
   * Handles response from the API and formats it.
   * @param data API response data.
   */
  private handleResponse(data: any) {
    const status = data.status === 'Success';
    const value = status ? data : data?.message;
    const key = status ? 'data' : 'message';
    return this.response(status, value, key);
  }

  /**
   * Validates the provided DTO.
   * @param dto Data transfer object.
   */
  async validateDto(dto: any): Promise<void> {
    const errors = await validate(dto);
    if (errors.length) {
      throw new Error(`Parameters validation errors: ${errors}`);
    }
  }

  /**
   * Executes an API request with the option to override baseURL.
   * @param endpoint API endpoint.
   * @param body Request payload.
   * @param baseURL Optional override for baseURL.
   */
  async sendApiRequest(endpoint: string, body: any, baseURL?: string): Promise<any> {
    const apiInstance = baseURL ? this.createAxiosInstance({ baseURL }) : this.api;

    try {
      const response = await apiInstance.post(endpoint, body);
      return this.handleResponse(response.data);
    } catch (error) {
      throw new Error(`Error in request to ${endpoint}: ${error}`);
    }
  }

  /**
   * Validates DTO, optionally executes a pre-request function, and sends an API request.
   * @param dto Data transfer object.
   * @param endpoint API endpoint.
   * @param DtoClass The class of the DTO to be used.
   * @param beforeRequest Optional function to execute before sending the request.
   * @param baseURL Optional override for baseURL.
   */
  public async validateAndSend(
    dto: any,
    endpoint: string,
    DtoClass: any,
    beforeRequest?: ((body: any) => void) | null,
    baseURL?: string
  ): Promise<any> {
    await this.validateDto(dto);
    const body = new DtoClass(dto);

    if (beforeRequest) {
      beforeRequest(body);
    }

    return this.sendApiRequest(endpoint, body, baseURL);
  }
}
