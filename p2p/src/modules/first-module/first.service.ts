import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from "@nestjs/common";
import { SharedService } from "../shared/shared.service";
import { FirstDTO } from "./dtos";
import { HandleOnCreateFirstUseCase } from "./use-cases/handle-on-create-first.use-case";
import { HandleOnUpdateFirstUseCase } from "./use-cases/handle-on-update-first.use-case";

@Injectable()
export class FirstService implements OnModuleInit, OnModuleDestroy {
  private logger: Logger = new Logger("FirstService");

  constructor(
    private readonly sharedService: SharedService, // Inject SharedService properly
    private readonly handleOnCreateFirstUseCase: HandleOnCreateFirstUseCase,
    private readonly handleOnUpdateFirstUseCase: HandleOnUpdateFirstUseCase
  ) {}

  // Lifecycle hook for initialization

  onModuleInit() {}
  async createFirst(firstDTO: FirstDTO) {
    const createdFirst = await this.handleOnCreateFirstUseCase.execute(
      firstDTO
    );
    this.sharedService.onCreateFirst$.next(createdFirst);
    return createdFirst;
  }
  async updateFirst(firstDTO: FirstDTO) {
    const updatedFirst = await this.handleOnUpdateFirstUseCase.execute(
      firstDTO
    );
    this.sharedService.onUpdateFirst$.next(updatedFirst);
    return updatedFirst;
  }
  // Cleanup on destroy
  onModuleDestroy() {
    if (this.sharedService.destroy$) {
      this.sharedService.destroy$.next(); // Signal completion
      this.sharedService.destroy$.complete(); // Close Subject
    }
    this.logger.log("FirstService cleaned up.");
  }
}
