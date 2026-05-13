import { Test, TestingModule } from '@nestjs/testing';
import { Role } from '@/core/enums/role.enum';
import { UsersService } from '@/modules/users/users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should return a placeholder profile', () => {
    expect(service.findProfile('user-1')).toEqual({
      id: 'user-1',
      email: 'placeholder@example.com',
      roles: [Role.USER],
    });
  });
});
