// app/api/banks/route.ts

import { NextResponse } from "next/server"
import { ensureUserExists } from "@/lib/ensureUser"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const user = await ensureUserExists()
  if (!user) return NextResponse.json([], { status: 401 })

  const banks = await prisma.bank.findMany({
    where: { user_id: user.id, is_active: true },
    select: {
      id: true,
      name: true,
      type: true,
      is_active: true,
    },
    orderBy: { name: "asc" },
  })

  return NextResponse.json(banks)
}
