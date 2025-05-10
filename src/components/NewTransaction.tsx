'use client'

import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import TransactionModal from "./TransactionModal"

export default function NewTransaction() {
  return (
    <div className="bg-gray-100 p-4 rounded-xl shadow">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default">Nuevo gasto / ingreso</Button>
        </DialogTrigger>
        <TransactionModal />
      </Dialog>
    </div>
  )
}
