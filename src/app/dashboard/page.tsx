// app/dashboard/page.tsx
import { SectionCards } from "@/components/section-cards";
import { DataTable } from "@/components/data-table";
import data from "./data.json";
import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function Page() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <SectionCards />
      <DataTable data={data} />
    </div>
  );
}
