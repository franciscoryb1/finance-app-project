import { auth0 } from "./auth0";
import { prisma } from "./prisma";

export async function ensureUserExists() {
  const session = await auth0.getSession();
  const user = session?.user;

  if (!user) return null;

  let dbUser = await prisma.user.findUnique({
    where: { auth_id: user.sub },
  });

  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        auth_id: user.sub,
        email: user.email || "",
        name: user.name || "",
        currency: "ARS", // Default inicial
      },
    });
  }

  return dbUser;
}
