import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import { AuthButton } from "@/components/AuthButton";

export const dynamic = "force-dynamic";

export default async function Page() {
  const session = await auth0.getSession();
  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm space-y-6 text-center">
        <div>
          <h1 className="text-3xl font-bold">Bienvenido</h1>
          <p className="text-muted-foreground mt-2">
            Iniciá sesión para continuar
          </p>
        </div>
        <AuthButton />
      </div>
    </div>
  );
}
