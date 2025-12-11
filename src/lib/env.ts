import { z } from 'zod'

const envSchema = z.object({
  API_BASE_URL: z.string().default(''),
  NEXT_PUBLIC_API_URL: z.string().default(''),
})

const envParse = envSchema.safeParse(process.env)

if (!envParse.success) {
  throw new Error('Variáveis de ambiente inválidas')
}

export const env = envParse.data

export const clientEnv = {
  apiBaseUrl: env.API_BASE_URL || '/api',
  nextPublicApiUrl: env.NEXT_PUBLIC_API_URL || '/api',
}
