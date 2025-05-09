import { NextResponse } from "next/server"
import { transactionSchema } from "@/lib/zodSchemas/transaction.schema"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = transactionSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.format() }, { status: 400 })
  }

  const data = parsed.data

  const newTransaction = await prisma.transaction.create({
    data: {
      ...data,
      date: new Date(data.date),
    },
  })

  return NextResponse.json(newTransaction)
}
