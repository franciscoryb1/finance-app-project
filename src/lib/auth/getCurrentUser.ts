import { cookies } from "next/headers"
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies"
import jwt from "jsonwebtoken"
import { prisma } from "@/lib/prisma"

export async function getCurrentUser() {
  const cookieStore = (await cookies()) as ReadonlyRequestCookies
  const token = cookieStore.get("appSession")?.value

  if (!token) return null

  const decoded: any = jwt.decode(token)
  const auth_id = decoded?.sub
  if (!auth_id) return null

  const user = await prisma.user.findUnique({
    where: { auth_id },
    select: { id: true, name: true, email: true },
  })

  return user
}
