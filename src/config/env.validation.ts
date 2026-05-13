import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'test', 'production')
    .default('development'),
  PORT: Joi.number().port().default(3000),
  CORS_ORIGIN: Joi.string().default('*'),
  THROTTLE_TTL: Joi.number().integer().positive().default(60000),
  THROTTLE_LIMIT: Joi.number().integer().positive().default(100),
  DATABASE_URL: Joi.string()
    .uri()
    .default(
      'postgresql://postgres:postgres@localhost:5432/northstar?schema=public&connection_limit=10&pool_timeout=20',
    ),
  JWT_ACCESS_TOKEN_SECRET: Joi.string()
    .min(16)
    .default('replace-this-access-secret'),
  JWT_ACCESS_TOKEN_EXPIRES_IN: Joi.string().default('15m'),
  JWT_REFRESH_TOKEN_SECRET: Joi.string()
    .min(16)
    .default('replace-this-refresh-secret'),
  JWT_REFRESH_TOKEN_EXPIRES_IN: Joi.string().default('7d'),
  BCRYPT_SALT_ROUNDS: Joi.number().integer().min(8).max(16).default(10),
});
