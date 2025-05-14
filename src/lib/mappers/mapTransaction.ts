// lib/mappers/mapTransaction.ts
import { z } from "zod"
import { transactionSchemaWithUser } from "@/lib/zodSchemas/transaction.schema"

type TransactionOutput = z.infer<typeof transactionSchemaWithUser>

export function mapTransaction(raw: any) {
  return {
    id: raw.id,
    user_id: raw.user_id,
    amount: Number(raw.amount),
    type: raw.type as "income" | "expense",
    payment_method: raw.payment_method as "cash" | "debit" | "credit" | "transfer",
    description: raw.description ?? undefined,
    date: raw.date.toISOString(),
    bank_id: raw.bank_id ?? undefined,
    credit_card_id: raw.credit_card_id ?? undefined,
    category_id: raw.category_id ?? undefined,
    category: raw.category?.name ?? "",
    category_color: raw.category?.color ?? "",
    bank: raw.bank?.name ?? "",
    bank_color: raw.bank?.color ?? "",
    credit_card: raw.credit_card?.name ?? "",
  }
}