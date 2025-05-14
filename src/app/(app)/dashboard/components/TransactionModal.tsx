"use client"

import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import TransactionForm from "./TransactionForm"

export default function TransactionModal({ onClose }: { onClose: () => void }) {
  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Nueva transacción</DialogTitle>
      </DialogHeader>

      <TransactionForm onSuccess={onClose} />
    </DialogContent>
  )
}
