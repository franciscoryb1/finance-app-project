'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import TransactionModal from "./TransactionModal"

export default function NewTransaction() {
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-gray-100 p-4 rounded-xl shadow">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="default">Nuevo gasto / ingreso</Button>
        </DialogTrigger>

        <TransactionModal onClose={() => setOpen(false)} />
      </Dialog>
    </div>
  )
}
