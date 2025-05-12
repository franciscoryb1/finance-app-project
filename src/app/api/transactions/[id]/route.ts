import { NextResponse } from "next/server"
import { ensureUserExists } from "@/lib/ensureUser"
import { prisma } from "@/lib/prisma"
import {
  transactionUpdateSchema,
} from "@/lib/zodSchemas/transaction.schema"

// PUT /api/transactions/:id
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const user = await ensureUserExists()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const parsed = transactionUpdateSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.format() }, { status: 400 })
  }

  const data = parsed.data

  const updated = await prisma.transaction.updateMany({
    where: {
      id: Number(params.id),
      user_id: user.id,
    },
    data: {
      ...data,
      date: data.date ? new Date(data.date) : undefined,
    },
  })

  if (updated.count === 0) {
    return NextResponse.json({ error: "Transacción no encontrada" }, { status: 404 })
  }

  return NextResponse.json({ success: true })
}

// DELETE /api/transactions/:id
export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const user = await ensureUserExists()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const deleted = await prisma.transaction.deleteMany({
    where: {
      id: Number(params.id),
      user_id: user.id,
    },
  })

  if (deleted.count === 0) {
    return NextResponse.json({ error: "Transacción no encontrada" }, { status: 404 })
  }

  return NextResponse.json({ success: true })
}
