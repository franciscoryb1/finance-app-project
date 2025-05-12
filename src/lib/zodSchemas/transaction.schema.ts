import { z } from "zod"

const baseTransactionSchema = z.object({
  amount: z.number().refine(val => val !== 0, "El monto no puede ser 0"),
  type: z.enum(["income", "expense"]),
  payment_method: z.enum(["cash", "debit", "credit", "transfer"]),
  description: z.string().optional(),
  date: z.string().datetime(),
  category_id: z.number().optional(),
  bank_id: z.number().optional(),
  credit_card_id: z.number().optional(),
})

// 🎯 Para el formulario del frontend (sin user_id)
export const transactionFormSchema = baseTransactionSchema

// ✅ Para el backend (POST o PUT): lo usás en API
export const transactionSchemaWithUser = baseTransactionSchema.extend({
  user_id: z.number().int().positive(),
})

// 🛠️ Para PUT, con campos opcionales
export const transactionUpdateSchema = transactionSchemaWithUser.partial()

// 🧪 Tipado útil para frontend
export type TransactionFormData = z.infer<typeof transactionFormSchema>
