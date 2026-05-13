import { Injectable } from '@nestjs/common';
import { MockRepository } from '@/data/mock.repository';

@Injectable()
export class ServiceService {
  constructor(private readonly repository: MockRepository) {}

  getData() {
    return this.repository.findAll();
  }
}
