import { z } from "zod"

export const creditCardSchema = z.object({
  id: z.number().int().positive(),
  user_id: z.number().int().positive(),
  bank_id: z.number().int().positive(),
  name: z.string(),
  last_four: z.string().length(4),
  due_day: z.number().int().min(1).max(31),
  closing_day: z.number().int().min(1).max(31),
  credit_limit: z.number(),
  current_balance: z.number(),
  interest_rate: z.number(),
  is_active: z.boolean(),
  created_at: z.string().datetime(),
})

export const creditCardListSchema = creditCardSchema.pick({
  id: true,
  name: true,
  last_four: true,
  bank_id: true,
})

export type CreditCard = z.infer<typeof creditCardSchema>
export type CreditCardListItem = z.infer<typeof creditCardListSchema>
