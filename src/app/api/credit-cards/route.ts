import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { ensureUserExists } from "@/lib/ensureUser"

export async function GET(request: NextRequest) {
  const user = await ensureUserExists()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const bankIdParam = searchParams.get("bank_id")
  const bank_id = bankIdParam ? parseInt(bankIdParam) : null

  const cards = await prisma.creditCard.findMany({
    where: {
      user_id: user.id,
      is_active: true,
      ...(bank_id ? { bank_id } : {}),
    },
    select: {
      id: true,
      name: true,
      last_four: true,
      bank_id: true,
    },
    orderBy: {
      name: "asc",
    },
  })

  return NextResponse.json(cards)
}