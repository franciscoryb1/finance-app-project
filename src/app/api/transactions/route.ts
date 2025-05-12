import { NextResponse } from "next/server"
import { ensureUserExists } from "@/lib/ensureUser"
import { prisma } from "@/lib/prisma"
import { transactionFormSchema } from "@/lib/zodSchemas/transaction.schema"

export async function POST(req: Request) {
  const user = await ensureUserExists()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()

  // ✅ Validar directamente con el schema correcto (ya no incluye user_id)
  const parsed = transactionFormSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.format() }, { status: 400 })
  }

  const data = parsed.data

  const transaction = await prisma.transaction.create({
    data: {
      ...data,
      user_id: user.id, // asignado internamente
      date: new Date(data.date),
    },
  })

  return NextResponse.json(transaction, { status: 201 })
}
