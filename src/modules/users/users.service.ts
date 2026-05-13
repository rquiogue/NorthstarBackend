import { Injectable } from '@nestjs/common';
import { Role } from '@/core/enums/role.enum';

@Injectable()
export class UsersService {
  findProfile(userId: string) {
    return {
      id: userId,
      email: 'placeholder@example.com',
      roles: [Role.USER],
    };
  }
}
