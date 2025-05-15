"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { bankFormSchema, BankFormData } from "@/lib/zodSchemas/bank.schema"
import { createBank } from "../actions/create-bank"
import { updateBank } from "../actions/update-bank"
import { toast } from "sonner"
import {
  DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export function BankForm({
  onSuccess,
  initialData,
}: {
  onSuccess?: () => void
  initialData?: { id: number } & BankFormData
}) {
  const form = useForm<BankFormData>({
    resolver: zodResolver(bankFormSchema),
    defaultValues: initialData ?? {
      name: "",
      type: "bank",
      balance: 0,
      is_active: true,
    },
  })

  const onSubmit = async (data: BankFormData) => {
    const result = initialData?.id
      ? await updateBank(initialData.id, data)
      : await createBank(data)

    if (result.success) {
      toast.success(`Banco ${initialData ? "actualizado" : "creado"} correctamente`)
      form.reset()
      onSuccess?.()
    } else {
      toast.error("Error al guardar banco")
      console.error(result.error)
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{initialData ? "Editar banco" : "Nuevo banco"}</DialogTitle>
      </DialogHeader>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label>Nombre</Label>
          <Input {...form.register("name")} />
        </div>

        <div>
          <Label>Tipo</Label>
          <Select
            value={form.watch("type")}
            onValueChange={(value) => form.setValue("type", value as BankFormData["type"])}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bank">Banco</SelectItem>
              <SelectItem value="ewallet">Billetera</SelectItem>
              <SelectItem value="cash">Efectivo</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Saldo</Label>
          <Input type="number" step="0.01" {...form.register("balance", { valueAsNumber: true })} />
        </div>

        <div className="flex items-center justify-between">
          <Label>Activo</Label>
          <Switch
            checked={form.watch("is_active")}
            onCheckedChange={(value) => form.setValue("is_active", value)}
          />
        </div>

        <DialogFooter>
          <Button type="submit">Guardar</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}