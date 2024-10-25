import { RequestDto } from '../../dtos/request.dto';
import { QueueStatsDto } from '../../dtos/queue.stats.dto';
import { Base } from '../base';
import { AddInternalDto } from '../../dtos/add.internal.dto';
import { RemoveInternalDto } from '../../dtos/remove.internal.dto';
import { InternalBreakDto } from '../../dtos/internal.break.dto';
import { AddExternalNumberDto } from '../../dtos/add.external.number.dto';

class Queue extends Base {
  constructor(options: RequestDto) {
    super(options);
  }

  /**
   * Returns the information of all queues.
   * @param dto StartCallDto
   */
  async stats(dto: QueueStatsDto): Promise<any> {
    return this.validateAndSend(dto, '/queuestats', QueueStatsDto);
  }

  /**
   * Adds a new extension to the queue.
   * @param dto AddInternalDto
   * @returns
   */
  async addInternal(dto: AddInternalDto): Promise<any> {
    return this.validateAndSend(dto, '/agentlogin', AddInternalDto);
  }

  /**
   * Removes an extension from the queue.
   * @param dto RemoveInternalDto
   * @returns
   */
  async removeInternal(dto: RemoveInternalDto): Promise<any> {
    return this.validateAndSend(dto, '/agentlogoff', RemoveInternalDto);
  }

  /**
   * Starts a break for the extension.
   * @param dto takeInternalBreak
   * @returns
   */
  async takeInternalBreak(dto: InternalBreakDto): Promise<any> {
    dto.paused = 1;
    return this.validateAndSend(dto, '/agentpause', InternalBreakDto);
  }

  /**
   * Ends the break for the extension.
   * @param dto outInternalBreak
   * @returns
   */
  async outInternalBreak(dto: InternalBreakDto): Promise<any> {
    dto.paused = 0;
    return this.validateAndSend(dto, '/agentpause', InternalBreakDto);
  }

    /**
   *
   * @param dto addExternalNumber
   * @returns
   */
    async addExternalNumber(dto: AddExternalNumberDto): Promise<any> {
      return this.validateAndSend(dto, '/netsantral/queue', AddExternalNumberDto);
    }

  /**
   * Validate DTO and send an API request.
   * @param dto Data transfer object.
   * @param endpoint API endpoint.
   * @param DtoClass The class of the DTO to be used.
   */
  private async validateAndSend(
    dto: any,
    endpoint: string,
    DtoClass: any,
  ): Promise<any> {
    await this.validateDto(dto);
    const body = new DtoClass(dto);
    return this.sendApiRequest(endpoint, body);
  }
}

export default Queue;
