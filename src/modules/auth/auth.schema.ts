import { z } from 'zod';

export const SignUpCreateSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'E-mail: campo obrigatório')
    .max(254, 'E-mail: muito longo')
    .email('E-mail: formato inválido'),

  password: z
    .string()
    .min(8, 'Senha: mínimo 8 caracteres')
    .regex(/^\S+$/, 'Senha: não pode conter espaços')
    .regex(/[0-9]/, 'Senha: deve conter 1 número')
    .regex(/[!@#$%^&*]/, 'Senha: deve conter 1 caractere especial')
    .regex(/[A-Z]/, 'Senha: deve conter 1 letra maiúscula')
    .regex(/[a-z]/, 'Senha: deve conter 1 letra minúscula'),
});

export const SignInSchema = z.object({
  email: z.string().trim().min(1, 'E-mail: campo obrigatório').email('E-mail: formato inválido'),
  password: z.string().min(1, 'Senha: campo obrigatório'),
});

export type SignUpInput = z.infer<typeof SignUpCreateSchema>;
export type SignInInput = z.infer<typeof SignInSchema>;
