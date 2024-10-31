import { RequestDto } from '../../dtos/request.dto';
import { StartCallDto } from '../../dtos/start.call.dto';
import { EndCallDto } from '../../dtos/end.call.dto';
import { MuteCallDto } from '../../dtos/mute.call.dto';
import { LinkupCallDto } from '../../dtos/linkup.call.dto';
import { Base } from '../base';
import { TransferCallDto } from '../../dtos/transfer.call.dto';
import { CallInfoOption } from '../../options/call.info.options';
import { DynamicRedirect } from '../../dtos/dynamic.redirect.dto';
import config from '../../config/api.config';

class Call extends Base {
  private callInfo: CallInfoOption | undefined;

  constructor(options: RequestDto) {
    options.baseUrl = `${config.NETSANTRAL_API}/${options.username}`;
    super(options);
  }

  /**
   * Set the call information based on the response from the API.
   * @param value Promise resolving to the API response.
   */
  private async setCallInfo(value: Promise<any>) {
    const response = await value;
    if (response?.status) {
      const { unique_id, crm_id } = response.data;
      this.callInfo = { unique_id, crm_id };
    }
  }

  async clearCallInfo() {
    this.callInfo = undefined;
  }

  /**
   * Set default call values from callInfo.
   * @param data Data object to update.
   */
  private setDefaultCallValue(data: any) {
    if (!data?.crm_id) data.crm_id = this.callInfo?.crm_id;
    if (!data?.unique_id) data.unique_id = this.callInfo?.unique_id;
  }

  /**
   * Start a call with the provided DTO.
   * @param dto StartCallDto
   */
  async start(dto: StartCallDto): Promise<any> {
    const response = await this.validateAndSend(
      dto,
      '/originate',
      StartCallDto,
      (body) => this.setDefaultCallValue(body),
    );
    await this.setCallInfo(response); // setCallInfo burada çağrılıyor
    return response;
  }

  /**
   * End a call with the provided DTO.
   * @param dto EndCallDto
   */
  async end(dto: EndCallDto): Promise<any> {
    const result = await this.validateAndSend(dto, '/hangup', EndCallDto);
    if (result?.status) await this.clearCallInfo();
    return result;
  }

  /**
   * Mute a call with the provided DTO.
   * @param dto MuteCallDto
   */
  async mute(dto: MuteCallDto): Promise<any> {
    return this.toggleMute(dto, 'mute');
  }

  /**
   * Unmute a call with the provided DTO.
   * @param dto MuteCallDto
   */
  async unMute(dto: MuteCallDto): Promise<any> {
    return this.toggleMute(dto, 'unmute');
  }

  /**
   * Link two external numbers together.
   * @param dto LinkupCallDto
   */
  async linkup(dto: LinkupCallDto): Promise<any> {
    return this.validateAndSend(dto, '/linkup', LinkupCallDto);
  }

  /**
   * Transfer a call with the provided DTO.
   * @param dto TransferCallDto
   */
  async transfer(dto: TransferCallDto): Promise<any> {
    return this.validateAndSend(dto, `/${dto.type}`, TransferCallDto);
  }

  /**
   * Initiate a call and perform dynamic routing
   * @param dto DynamicRedirect
   * @returns
   */
  async dynamicRedirect(dto: DynamicRedirect): Promise<any> {
    return this.validateAndSend(dto, '/dynamic_redirect', DynamicRedirect);
  }

  /**
   * Mute or unmute a call based on the state.
   * @param dto MuteCallDto
   * @param state 'mute' or 'unmute'
   */
  private async toggleMute(
    dto: MuteCallDto,
    state: 'mute' | 'unmute',
  ): Promise<any> {
    this.setDefaultCallValue(dto);
    dto.state = state;
    return this.sendApiRequest('/muteaudio', dto);
  }
}

export default Call;
