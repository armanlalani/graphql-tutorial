import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  PORT: z.string().transform(Number).default(4000),
  DB_URL: z.url(),
  NODE_ENV: z.enum(['development', 'production']).default('development'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid .env file:', parsed.error.format());
  process.exit(1);
}

export type EnvConfig = z.infer<typeof envSchema>;
export const CONFIG = parsed.data;
