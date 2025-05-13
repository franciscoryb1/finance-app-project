import { z } from "zod"

export const categorySchema = z.object({
  id: z.number().int().positive(),
  user_id: z.number().int().nullable(), // puede ser null para categorías del sistema
  name: z.string(),
  icon: z.string(),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
})

export const categoryListSchema = categorySchema.pick({
  id: true,
  name: true,
})

export type Category = z.infer<typeof categorySchema>
export type CategoryListItem = z.infer<typeof categoryListSchema>
