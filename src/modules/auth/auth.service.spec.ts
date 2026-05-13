import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '@/modules/auth/auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            signAsync: jest
              .fn()
              .mockResolvedValueOnce('access-token')
              .mockResolvedValueOnce('refresh-token')
              .mockResolvedValueOnce('access-token')
              .mockResolvedValueOnce('refresh-token'),
            verifyAsync: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string, defaultValue: unknown) => {
              if (key === 'auth.bcryptSaltRounds') {
                return 10;
              }
              return defaultValue;
            }),
            getOrThrow: jest.fn((key: string) => {
              const values: Record<string, string> = {
                'auth.accessTokenSecret': 'replace-this-access-secret',
                'auth.refreshTokenSecret': 'replace-this-refresh-secret',
              };
              return values[key];
            }),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('registers a placeholder user and returns tokens', async () => {
    await expect(
      service.register({
        email: 'user@example.com',
        password: 'password123',
      }),
    ).resolves.toMatchObject({
      user: { email: 'user@example.com', roles: ['user'] },
      tokens: {
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
      },
    });
  });

  it('logs in placeholder user and returns tokens', async () => {
    await expect(
      service.login({
        email: 'user@example.com',
        password: 'password123',
      }),
    ).resolves.toMatchObject({
      user: { email: 'user@example.com', roles: ['user'] },
      tokens: {
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
      },
    });
  });
});
