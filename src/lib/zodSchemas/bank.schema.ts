import { z } from "zod"

export const bankSchema = z.object({
  id: z.number().int().positive(),
  user_id: z.number().int().positive(),
  name: z.string().min(1),
  type: z.enum(["bank", "ewallet", "cash"]),
  balance: z.number(),
  is_active: z.boolean(),
  created_at: z.string().datetime(),
})

// Para listar en el frontend
export const bankListSchema = bankSchema.pick({
  id: true,
  name: true,
  type: true,
  is_active: true,
})

// Formulario de creación/edición
export const bankFormSchema = bankSchema.omit({
  id: true,
  user_id: true,
  created_at: true,
})

export type Bank = z.infer<typeof bankSchema>
export type BankListItem = z.infer<typeof bankListSchema>
export type BankFormData = z.infer<typeof bankFormSchema>
