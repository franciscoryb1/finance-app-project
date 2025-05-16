// ✅ 4. FRONTEND - TransactionForm.tsx (componente completo)

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { transactionFormSchema, TransactionFormData } from "@/lib/zodSchemas/transaction.schema"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

export default function TransactionForm({ onSuccess }: { onSuccess?: () => void }) {
  const [calendarDate, setCalendarDate] = useState<Date | undefined>(new Date())
  const [banks, setBanks] = useState<{ id: number; name: string }[]>([])
  const [creditCards, setCreditCards] = useState<{ id: number; name: string; last_four: string }[]>([])
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([])

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      date: new Date().toISOString(),
      type: "expense",
      payment_method: "cash",
    },
  })

  const selectedBankId = watch("bank_id")

  useEffect(() => {
    const fetchBanks = async () => {
      const res = await fetch("/api/banks?type=bank")
      const data = await res.json()
      setBanks(data)
    }
    const fetchCategories = async () => {
      const res = await fetch("/api/categories")
      const data = await res.json()
      setCategories(data)
    }
    fetchBanks()
    fetchCategories()
  }, [])

  useEffect(() => {
    if (!selectedBankId) {
      setCreditCards([])
      return
    }
    const fetchCreditCards = async () => {
      const res = await fetch(`/api/credit-cards?bank_id=${selectedBankId}`)
      const data = await res.json()
      setCreditCards(data)
    }
    fetchCreditCards()
  }, [selectedBankId])

  const onSubmit = async (data: TransactionFormData) => {
    const response = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      const error = await response.json()
      console.error("Error al guardar:", error)
      toast.error("Hubo un problema al guardar la transacción")
      return
    }
    const result = await response.json()

    reset({
      date: new Date().toISOString(),
      type: "expense",
      payment_method: "cash",
    })
    setCalendarDate(new Date())
    toast.success("Transacción guardada con éxito")
    if (onSuccess) onSuccess()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      {/* Fecha */}
      <div>
        <Label className="mb-2 block">Fecha</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {calendarDate ? format(calendarDate, "dd/MM/yyyy") : "Seleccionar fecha"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={calendarDate} onSelect={(d) => { if (d) { setCalendarDate(d); setValue("date", d.toISOString()) } }} initialFocus />
          </PopoverContent>
        </Popover>
      </div>

      {/* Tipo */}
      <div>
        <Label className="mb-2 block">Tipo</Label>
        <div className="grid grid-cols-2 gap-2">
          <Button type="button" variant="outline" className={cn("w-full", watch("type") === "expense" && "bg-red-400 text-white")} onClick={() => setValue("type", "expense")}>Gasto</Button>
          <Button type="button" variant="outline" className={cn("w-full", watch("type") === "income" && "bg-green-400 text-white")} onClick={() => setValue("type", "income")}>Ingreso</Button>
        </div>
      </div>

      {/* Categoría */}
      <div>
        <Label className="mb-2 block">Categoría</Label>
        <Select onValueChange={(val) => setValue("category_id", parseInt(val))}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Seleccionar categoría" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(cat => (
              <SelectItem key={cat.id} value={cat.id.toString()}>{cat.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Descripción */}
      <div>
        <Label className="mb-2 block">Descripción</Label>
        <Textarea placeholder="Ej: Cena con amigos" {...register("description")} />
      </div>

      {/* Medio de pago */}
      <div>
        <Label className="mb-2 block">Medio de pago</Label>
        <Select onValueChange={(val) => setValue("payment_method", val as TransactionFormData["payment_method"])}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Seleccionar medio" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cash">Efectivo</SelectItem>
            <SelectItem value="debit">Débito</SelectItem>
            <SelectItem value="credit">Crédito</SelectItem>
            <SelectItem value="transfer">Transferencia</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Banco */}
      <div>
        <Label className="mb-2 block">Banco</Label>
        <Select onValueChange={(val) => setValue("bank_id", parseInt(val))}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Seleccionar banco" />
          </SelectTrigger>
          <SelectContent>
            {banks.map(bank => (
              <SelectItem key={bank.id} value={bank.id.toString()}>{bank.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Tarjeta */}
      <div>
        <Label className="mb-2 block">Tarjeta de crédito</Label>
        <Select onValueChange={(val) => setValue("credit_card_id", parseInt(val))}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Seleccionar tarjeta" />
          </SelectTrigger>
          <SelectContent>
            {creditCards.length === 0 ? (
              <SelectItem disabled value="-1">No hay tarjetas disponibles</SelectItem>
            ) : (
              creditCards.map(card => (
                <SelectItem key={card.id} value={card.id.toString()}>
                  {card.name} •••• {card.last_four}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </div>

      {/* Monto */}
      <div>
        <Label className="mb-2 block">Monto</Label>
        <Input type="number" step="0.01" {...register("amount", { valueAsNumber: true })} />
      </div>

      <Button type="submit" className="w-full">Guardar transacción</Button>
    </form>
  )
}