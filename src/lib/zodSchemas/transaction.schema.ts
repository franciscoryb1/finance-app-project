import { z } from "zod"

export const transactionSchema = z.object({
  user_id: z.number().int().positive(), // agregado
  amount: z.number().refine(val => val !== 0, "El monto no puede ser 0"),
  type: z.enum(["income", "expense"]),
  payment_method: z.enum(["cash", "debit", "credit", "transfer"]),
  description: z.string().optional(),
  date: z.string().datetime(),
  category_id: z.number().optional(),
  bank_id: z.number().optional(),
  credit_card_id: z.number().optional(),
})

export type TransactionFormData = z.infer<typeof transactionSchema>
