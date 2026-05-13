export interface MockRecord {
  id: string;
  name: string;
}

export class MockRepository {
  private readonly rows: MockRecord[] = [{ id: '1', name: 'sample-record' }];

  findAll(): MockRecord[] {
    return this.rows;
  }
}
