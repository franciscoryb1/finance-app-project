// app/dashboard/page.tsx
import CardSummary from "@/components/CardSummary"
import CardDetails from "@/components/CardDetails"
import LastMovements from "@/components/LastMovements"
import NewTransaction from "@/components/NewTransaction"
import Insights from "@/components/Insights"
import TransactionsTable from "@/components/TransactionsTable"
import { DataTable } from "@/components/data-table"

import data from "./data.json";

export default function DashboardPage() {
  return (
    <div className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Columna izquierda */}
      <div className="lg:col-span-2 space-y-4">
        <CardSummary />
        <CardDetails />
        <LastMovements />
      </div>

      {/* Columna derecha */}
      <div className="space-y-4">
        <NewTransaction />
        <Insights />
      </div>

      {/* Fila completa abajo */}
      <div className="lg:col-span-3">
        <DataTable data={data} />
      </div>
    </div>
  )
}
