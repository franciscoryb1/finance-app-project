### **1. TABLA `users` (USUARIOS)**  
**¿Qué es?**  
Tabla maestra que almacena todos los usuarios registrados en la aplicación.  

**¿Qué contiene?**  
- `id`: Identificador único (autoincremental)  
- `auth_id`: ID de autenticación externa (Auth0/Firebase)  
- `email`: Correo electrónico (único por usuario)  
- `name`: Nombre personal del usuario  
- `currency`: Moneda preferida (USD, EUR, ARS, etc.)  
- `created_at`: Fecha de registro  

**Relaciones clave**:  
- Un usuario → Puede tener múltiples bancos (`banks`)  
- Un usuario → Puede tener múltiples tarjetas (`credit_cards`)  

---

### **2. TABLA `banks` (BANCOS/MEDIOS DE PAGO)**  
**¿Qué es?**  
Registra todas las cuentas bancarias, billeteras virtuales o efectivo del usuario.  

**¿Qué contiene?**  
- `type`: Tipo de medio ("bank", "ewallet", "cash")  
- `balance`: Saldo actual de la cuenta  
- `is_active`: Si está activo o no  

**Ejemplo de dato**:  
| id | user_id | name      | type    | balance |  
|----|---------|-----------|---------|---------|  
| 1  | 1       | Santander | bank    | 1500.00 |  

**Relaciones clave**:  
- Un banco → Pertenece a un usuario (`users.id`)  
- Un banco → Puede tener tarjetas asociadas (`credit_cards`)  

---

### **3. TABLA `credit_cards` (TARJETAS DE CRÉDITO)**  
**¿Qué es?**  
Almacena todas las tarjetas de crédito registradas por los usuarios.  

**Campos importantes**:  
- `due_day`: Día del mes en que vence el pago  
- `closing_day`: Día de cierre del resumen  
- `credit_limit`: Límite total de la tarjeta  
- `current_balance`: Saldo actual (se actualiza automáticamente)  

**Relaciones clave**:  
- Una tarjeta → Pertenece a un banco (`banks.id`)  
- Una tarjeta → Genera ciclos de facturación (`billing_cycles`)  

---

### **4. TABLA `categories` (CATEGORÍAS)**  
**¿Qué es?**  
Clasifica transacciones en grupos como "Comida", "Transporte", etc.  

**Características**:  
- `user_id`: Si es NULL, es una categoría predefinida del sistema  
- `icon`: Ícono visual (ej: "shopping-cart")  
- `color`: Color en formato HEX (ej: "#FF5733")  

**Relaciones**:  
- Una categoría → Puede usarse en múltiples transacciones  

---

### **5. TABLA `transactions` (TRANSACCIONES)**  
**¿Qué es?**  
Registro central de todos los movimientos de dinero (ingresos y gastos).  

**Campos clave**:  
- `amount`:  
  - Positivo = Ingreso (ej: salario)  
  - Negativo = Gasto (ej: compra en supermercado)  
- `type`: "income" (ingreso) o "expense" (gasto)  
- `payment_method`: "cash", "debit", "credit", "transfer"  

**Relaciones**:  
- Una transacción → Pertenece a un usuario  
- Una transacción → Puede vincularse a un banco o tarjeta  
- Una transacción → Tiene una categoría  

---

### **6. TABLA `billing_cycles` (CICLOS DE FACTURACIÓN)**  
**¿Qué es?**  
Controla los resúmenes mensuales de las tarjetas de crédito.  

**Datos importantes**:  
- `start_date`/`end_date`: Periodo del ciclo  
- `due_date`: Fecha límite de pago  
- `status`: "open", "closed", "paid", "overdue"  

**Relaciones**:  
- Un ciclo → Pertenece a una tarjeta (`credit_cards.id`)  

---

### **7. TABLA `credit_card_transactions` (CONSUMOS EN TARJETA)**  
**¿Qué es?**  
Detalle de compras realizadas con tarjeta de crédito.  

**Campos especiales**:  
- `installments`: Número de cuotas (ej: 12)  
- `is_installment`: Si es una cuota de una compra mayor  
- `parent_transaction_id`: Vincula cuotas a una compra original  

**Relaciones**:  
- Un consumo → Pertenece a un ciclo de facturación  
- Un consumo → Está vinculado a una transacción general  

---

### **8. TABLA `debts` (DEUDAS)**  
**¿Qué es?**  
Registro de préstamos o deudas personales (no asociadas a tarjetas).  

**Campos relevantes**:  
- `creditor_name`: Quién prestó el dinero  
- `pending_amount`: Saldo por pagar  
- `interest_rate`: Tasa de interés aplicada  

**Relaciones**:  
- Una deuda → Pertenece a un usuario  

---