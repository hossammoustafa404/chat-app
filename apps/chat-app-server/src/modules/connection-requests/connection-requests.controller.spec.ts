import { Test, TestingModule } from '@nestjs/testing';
import { ConnectionRequestsController } from './connection-requests.controller';
import { ConnectionRequestsService } from './connection-requests.service';

describe('ConnectionRequestsController', () => {
  let controller: ConnectionRequestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConnectionRequestsController],
      providers: [ConnectionRequestsService],
    }).compile();

    controller = module.get<ConnectionRequestsController>(
      ConnectionRequestsController
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
