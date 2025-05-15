'use server'

import { prisma } from "@/lib/prisma"
import { bankFormSchema } from "@/lib/zodSchemas/bank.schema"
import { ensureUserExists } from "@/lib/ensureUser"
import { revalidatePath } from "next/cache"

export async function createBank(formData: unknown) {
  const user = await ensureUserExists()

  if (!user) {
    return { success: false, error: "Unauthorized" }
  }

  const parsed = bankFormSchema.safeParse(formData)

  if (!parsed.success) {
    return { success: false, error: parsed.error.flatten() }
  }

  const { name, type, balance, is_active } = parsed.data

  try {
    await prisma.bank.create({
      data: {
        name,
        type,
        balance,
        is_active,
        user_id: user.id,
      },
    })

    revalidatePath("/banks") // Para que se actualice la tabla

    return { success: true }
  } catch (error) {
    console.error("Error creando banco:", error)
    return { success: false, error: "Error interno del servidor" }
  }
}
