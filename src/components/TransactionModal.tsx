import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import TransactionForm from "./TransactionForm"

export default function TransactionModal() {
  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Nueva transacción</DialogTitle>
      </DialogHeader>

      <TransactionForm />

      <DialogFooter>
        <Button type="submit" form="transaction-form">Guardar</Button>
      </DialogFooter>
    </DialogContent>
  )
}
