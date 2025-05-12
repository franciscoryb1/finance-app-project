import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import { ensureUserExists } from "@/lib/ensureUser";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { SiteHeader } from "@/components/site-header";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth0.getSession();
  const user = session?.user;

  if (!user) {
    redirect("/login");
  }

  const dbUser = await ensureUserExists();

  // Acá ya tenés acceso al `dbUser.id`, que es tu ID real en la base de datos

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
