import { NextResponse } from "next/server"
import { ensureUserExists } from "@/lib/ensureUser"
import { prisma } from "@/lib/prisma"

// Función para parsear string a booleano o undefined
function parseIsActive(value: string | null): boolean | undefined {
  if (value === "true") return true
  if (value === "false") return false
  return undefined
}

export async function GET(req: Request) {
  const user = await ensureUserExists()
  if (!user) return NextResponse.json([], { status: 401 })

  const { searchParams } = new URL(req.url)
  const isActiveParam = searchParams.get("is_active")
  const isActive = parseIsActive(isActiveParam)

  const banks = await prisma.bank.findMany({
    where: {
      user_id: user.id,
      ...(isActive !== undefined && { is_active: isActive }),
    },
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
