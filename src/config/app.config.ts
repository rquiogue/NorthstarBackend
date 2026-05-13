import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 3000),
  corsOrigin: process.env.CORS_ORIGIN ?? '*',
  throttleTtl: Number(process.env.THROTTLE_TTL ?? 60000),
  throttleLimit: Number(process.env.THROTTLE_LIMIT ?? 100),
}));
