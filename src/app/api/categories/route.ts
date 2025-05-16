import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { ensureUserExists } from "@/lib/ensureUser"

export async function GET(request: NextRequest) {
  const user = await ensureUserExists()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })



  const categories = await prisma.category.findMany({
    where: {
      user_id: user.id,
    },
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      name: "asc",
    },
  })
  
  return NextResponse.json(categories)
}
