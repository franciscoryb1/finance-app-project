// app/actions/getTransactions.ts
"use server"

import { prisma } from "@/lib/prisma"
import { auth0 } from "@/lib/auth0"
import { mapTransaction } from "@/lib/mappers/mapTransaction"
import { ensureUserExists } from "@/lib/ensureUser"

export async function getTransactions() {
  const session = await auth0.getSession()
  if (!session?.user) throw new Error("Unauthorized")

  const dbUser = await ensureUserExists();

  const rawTransactions = await prisma.transaction.findMany({
    where: { user_id: dbUser?.id },
    orderBy: { date: "desc" },
    include: {
      category: true,
      bank: true,
      credit_card: true,
    },
  })

  return rawTransactions.map(mapTransaction)
}
