'use server'

import { prisma } from "@/lib/prisma"
import { bankFormSchema } from "@/lib/zodSchemas/bank.schema"
import { ensureUserExists } from "@/lib/ensureUser"
import { revalidatePath } from "next/cache"

export async function updateBank(id: number, formData: unknown) {
  const user = await ensureUserExists()
  if (!user) return { success: false, error: "Unauthorized" }

  const parsed = bankFormSchema.safeParse(formData)
  if (!parsed.success) {
    return { success: false, error: parsed.error.flatten() }
  }

  const { name, type, balance, is_active } = parsed.data

  try {
    await prisma.bank.updateMany({
      where: {
        id,
        user_id: user.id,
      },
      data: {
        name,
        type,
        balance,
        is_active,
      },
    })

    revalidatePath("/banks")
    return { success: true }
  } catch (error) {
    console.error("Error actualizando banco:", error)
    return { success: false, error: "Error interno del servidor" }
  }
}
