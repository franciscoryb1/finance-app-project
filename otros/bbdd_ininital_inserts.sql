
-- 1. Usuario
INSERT INTO public."User" (auth_id, email, name, currency, created_at)
VALUES ('auth0|123', 'usuario@demo.com', 'Usuario Demo', 'ARS', '2025-05-09 01:44:57');

-- 2. Banco
INSERT INTO public."Bank" (user_id, name, type, balance, is_active, created_at)
VALUES (1, 'Cuenta Santander', 'bank', 50000.00, true, '2025-05-09 01:44:57');

-- 3. Tarjeta de Crédito
INSERT INTO public."CreditCard"(
	user_id, bank_id, name, last_four, due_day, closing_day, credit_limit, current_balance, interest_rate, is_active)
	VALUES (1, 1, 'Visa Santander', '1234', 10, 3, 100000.00, 5000.00, 55.00, true);

-- 4. Categoría
INSERT INTO public."Category"(
	user_id, name, icon, color)
	VALUES (1, 'Supermercado', 'shopping-cart', '#00ADEF');

-- 5. Transacción
INSERT INTO public."Transaction"(
	user_id, bank_id, credit_card_id, category_id, amount, description, type, payment_method, date, is_recurring)
	VALUES (1, 1, NULL, 1, -1500.00, 'Compra en supermercado', 'expense', 'debit', '2025-05-08', false);

-- 6. Ciclo de Facturación
INSERT INTO public."BillingCycle"(
	credit_card_id, start_date, end_date, due_date, total_spent, paid_amount, status)
	VALUES (1, '2025-05-01', '2025-05-31', '2025-06-10',
  12000.00, 0.00, 'open');

-- 7. Consumo con tarjeta
INSERT INTO public."CreditCardTransaction"(
	credit_card_id, billing_cycle_id, amount, description, date, category_id, installments, is_installment, parent_transaction_id)
	VALUES (1, 2, 12000.00, 'Compra en electrodomésticos',
  '2025-05-07', 1, 12, true, NULL);

-- 8. Deuda
INSERT INTO public."Debt"(
	user_id, creditor_name, initial_amount, pending_amount, interest_rate, due_date, status)
	VALUES (1, 'Banco Nación', 100000.00, 80000.00,
  45.00, '2025-08-15', 'active');
