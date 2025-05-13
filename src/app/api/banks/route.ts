import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { ensureUserExists } from "@/lib/ensureUser"

export async function GET(request: NextRequest) {
  const user = await ensureUserExists()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const includeInactive = searchParams.get("includeInactive") === "true"
  const type = searchParams.get("type")

  const banks = await prisma.bank.findMany({
    where: {
      user_id: user.id,
      ...(includeInactive ? {} : { is_active: true }),
      ...(type ? { type } : {}),
    },
    select: {
      id: true,
      name: true,
      type: true,
      is_active: true,
    },
  })

  return NextResponse.json(banks)
}