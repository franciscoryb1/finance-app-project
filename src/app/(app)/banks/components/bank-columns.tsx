import { ColumnDef } from "@tanstack/react-table"
import { BankListItem } from "@/lib/zodSchemas/bank.schema"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { BankForm } from "./bank-form"

export const columns = (onBankUpdated: () => void): ColumnDef<BankListItem>[] => [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row }) => {
      const type = row.original.type
      const label =
        type === "bank" ? "Banco" : type === "ewallet" ? "Billetera" : "Efectivo"
      return <Badge className="capitalize">{label}</Badge>
    },
  },
  {
    accessorKey: "is_active",
    header: "Estado",
    cell: ({ row }) =>
      row.original.is_active ? (
        <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
          Activo
        </Badge>
      ) : (
        <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200">
          Inactivo
        </Badge>
      ),
  },
  {
    id: "acciones",
    header: "Acciones",
    cell: ({ row }) => (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">Editar</Button>
        </DialogTrigger>
        <BankForm
          initialData={{ ...row.original, balance: 0 }}
          onSuccess={onBankUpdated}
        />
      </Dialog>
    ),
  },
]