'use client'

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { transactionSchema, TransactionFormData } from "@/lib/zodSchemas/transaction.schema"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
    Select, SelectTrigger, SelectValue, SelectContent, SelectItem
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"

export default function TransactionForm() {
    const [calendarDate, setCalendarDate] = useState<Date | undefined>(new Date())

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<TransactionFormData>({
        resolver: zodResolver(transactionSchema),
        defaultValues: {
            user_id: 1, // Reemplazar dinámicamente con el usuario autenticado
            date: new Date().toISOString(),
            type: "expense",
            payment_method: "cash",
        },
    })

    const onSubmit = (data: TransactionFormData) => {
        console.log("Transacción enviada:", data)
    }

    return (
        <form id="transaction-form" onSubmit={handleSubmit(onSubmit)} className="space-y-3">

            {/* Tipo */}
            <div>
                <Label className="mb-2 block">Tipo</Label>
                <div className="grid grid-cols-2 gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        className={cn(
                            "w-full",
                            watch("type") === "expense" && "bg-red-400 text-white hover:bg-red-500 hover:text-white"
                        )}
                        onClick={() => setValue("type", "expense")}
                    >
                        Gasto
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        className={cn(
                            "w-full",
                            watch("type") === "income" && "bg-green-400 text-white hover:bg-green-500 hover:text-white"
                        )}
                        onClick={() => setValue("type", "income")}
                    >
                        Ingreso
                    </Button>
                </div>
                {errors.type && <p className="text-sm text-red-500">{errors.type.message}</p>}
            </div>


            {/* Categoría */}
            <div>
                <Label className="mb-2 block">Categoría</Label>
                <Select onValueChange={(val) => setValue("category_id", parseInt(val))}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccionar categoría" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1">Comida</SelectItem>
                        <SelectItem value="2">Transporte</SelectItem>
                        <SelectItem value="3">Salario</SelectItem>
                    </SelectContent>
                </Select>

                {errors.category_id && <p className="text-sm text-red-500">{errors.category_id.message}</p>}
            </div>

            {/* Monto */}
            <div>
                <Label className="mb-2 block">Monto</Label>
                <Input
                    type="number"
                    step="0.01"
                    {...register("amount", { valueAsNumber: true })}
                />
                {errors.amount && <p className="text-sm text-red-500">{errors.amount.message}</p>}
            </div>

            {/* Fecha */}
            <div>
                <Label className="mb-2 block">Fecha</Label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn("w-full justify-start text-left font-normal", !calendarDate && "text-muted-foreground")}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {calendarDate ? format(calendarDate, "dd/MM/yyyy") : <span>Seleccionar fecha</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={calendarDate}
                            onSelect={(d) => {
                                if (d) {
                                    setCalendarDate(d)
                                    setValue("date", d.toISOString())
                                }
                            }}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
                {errors.date && <p className="text-sm text-red-500">{errors.date.message}</p>}
            </div>

            {/* Descripción */}
            <div>
                <Label className="mb-2 block">Descripción</Label>
                <Textarea
                    placeholder="Ej: Cena con amigos"
                    {...register("description")}
                />
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
                {errors.payment_method && <p className="text-sm text-red-500">{errors.payment_method.message}</p>}
            </div>

            {/* Banco (opcional) */}
            <div>
                <Label className="mb-2 block">Banco (opcional)</Label>
                <Select onValueChange={(val) => setValue("bank_id", parseInt(val))}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccionar banco" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1">Santander</SelectItem>
                        <SelectItem value="2">MercadoPago</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Tarjeta (opcional) */}
            <div>
                <Label className="mb-2 block">Tarjeta de crédito (opcional)</Label>
                <Select onValueChange={(val) => setValue("credit_card_id", parseInt(val))}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccionar tarjeta" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1">Visa - Santander</SelectItem>
                        <SelectItem value="2">Mastercard - Galicia</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </form>
    )
}
