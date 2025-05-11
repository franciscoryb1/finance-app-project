// app/(app)/layout.tsx
import { auth0 } from "@/lib/auth0"
import { redirect } from "next/navigation"

import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { SiteHeader } from "@/components/site-header"

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth0.getSession()
  const user = session?.user

  if (!user) {
    redirect("/login")
  }

  return (
    <html lang="es">
      <body>
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
      </body>
    </html>
  )
}
