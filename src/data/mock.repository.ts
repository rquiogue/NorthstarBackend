import { Injectable } from '@nestjs/common';

export interface MockRecord {
  id: string;
  name: string;
}

@Injectable()
export class MockRepository {
  private readonly rows: MockRecord[] = [{ id: '1', name: 'sample-record' }];

  findAll(): MockRecord[] {
    return this.rows;
  }
}
