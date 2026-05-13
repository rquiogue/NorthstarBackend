import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { StringValue } from 'ms';
import { Role } from '@/core/enums/role.enum';
import { LoginDto } from '@/modules/auth/dto/login.dto';
import { RegisterDto } from '@/modules/auth/dto/register.dto';

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

interface AuthUser {
  id: string;
  email: string;
  roles: Role[];
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(
    dto: RegisterDto,
  ): Promise<{ user: AuthUser; tokens: AuthTokens }> {
    const user = await this.createPlaceholderUser(dto);
    const tokens = await this.signTokens(user);

    return { user, tokens };
  }

  async login(dto: LoginDto): Promise<{ user: AuthUser; tokens: AuthTokens }> {
    await this.validatePlaceholderCredentials(dto.password);

    const user: AuthUser = {
      id: 'placeholder-user-id',
      email: dto.email,
      roles: [Role.USER],
    };

    const tokens = await this.signTokens(user);

    return { user, tokens };
  }

  async refresh(refreshToken: string): Promise<AuthTokens> {
    try {
      const payload = await this.jwtService.verifyAsync<{
        sub: string;
        email: string;
        roles: Role[];
      }>(refreshToken, {
        secret: this.configService.getOrThrow<string>(
          'auth.refreshTokenSecret',
        ),
      });

      return this.signTokens({
        id: payload.sub,
        email: payload.email,
        roles: payload.roles,
      });
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = this.configService.get<number>(
      'auth.bcryptSaltRounds',
      10,
    );
    return bcrypt.hash(password, saltRounds);
  }

  private async createPlaceholderUser(dto: RegisterDto): Promise<AuthUser> {
    const passwordHash = await this.hashPassword(dto.password);
    if (passwordHash.length === 0) {
      throw new UnauthorizedException('Unable to hash password');
    }

    return {
      id: 'placeholder-user-id',
      email: dto.email,
      roles: [Role.USER],
    };
  }

  private async validatePlaceholderCredentials(
    password: string,
  ): Promise<void> {
    const passwordHash = await this.hashPassword(password);
    const isValid = await bcrypt.compare(password, passwordHash);
    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  private async signTokens(user: AuthUser): Promise<AuthTokens> {
    const payload = {
      sub: user.id,
      email: user.email,
      roles: user.roles,
    };
    const accessTokenExpiresIn = this.configService.get<string>(
      'auth.accessTokenExpiresIn',
      '15m',
    ) as StringValue;
    const refreshTokenExpiresIn = this.configService.get<string>(
      'auth.refreshTokenExpiresIn',
      '7d',
    ) as StringValue;

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.getOrThrow<string>('auth.accessTokenSecret'),
        expiresIn: accessTokenExpiresIn,
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.getOrThrow<string>(
          'auth.refreshTokenSecret',
        ),
        expiresIn: refreshTokenExpiresIn,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
