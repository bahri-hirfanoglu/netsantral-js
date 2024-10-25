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
  async startInternalBreak(dto: InternalBreakDto): Promise<any> {
    dto.paused = 1;
    return this.validateAndSend(dto, '/agentpause', InternalBreakDto);
  }

  /**
   * Ends the break for the extension.
   * @param dto stopInternalBreak
   * @returns
   */
  async stopInternalBreak(dto: InternalBreakDto): Promise<any> {
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


}

export default Queue;
