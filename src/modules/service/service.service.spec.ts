import { Test, TestingModule } from '@nestjs/testing';
import { ServiceService } from '@/modules/service/service.service';
import { MockRepository } from '@/data/mock.repository';

describe('ServiceService', () => {
  let service: ServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceService, MockRepository],
    }).compile();

    service = module.get<ServiceService>(ServiceService);
  });

  it('returns mocked records', () => {
    expect(service.getData()).toEqual([{ id: '1', name: 'sample-record' }]);
  });
});
