"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { PlusIcon } from "lucide-react"
import { BankForm } from "./components/bank-form"
import { BankTable } from "./components/bank-table"
import { BankListItem } from "@/lib/zodSchemas/bank.schema"

export default function BanksPage() {
  const [banks, setBanks] = useState<BankListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)

  const fetchBanksFromApi = async (): Promise<BankListItem[]> => {
    try {
      const res = await fetch("/api/banks", { cache: "no-store" })
      if (!res.ok) return []
      return await res.json()
    } catch (error) {
      console.error("Error al obtener bancos:", error)
      return []
    }
  }

  useEffect(() => {
    fetchBanksFromApi().then((data) => {
      setBanks(data)
      setLoading(false)
    })
  }, [])

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Mis bancos y medios de pago</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusIcon className="w-4 h-4 mr-2" />
              Nuevo banco
            </Button>
          </DialogTrigger>
          <BankForm
            onSuccess={async () => {
              const updated = await fetchBanksFromApi()
              setBanks(updated)
              setOpen(false)
            }}
          />
        </Dialog>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Cargando bancos...</p>
      ) : (
        <BankTable data={banks} />
      )}
    </div>
  )
}
