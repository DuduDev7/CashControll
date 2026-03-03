const INCOMES_KEY = 'incomes'
const EXPENSES_KEY = 'expenses'

/* ======================
   INCOMES (Receitas)
====================== */

export function getIncomes() {
  return JSON.parse(localStorage.getItem(INCOMES_KEY)) || []
}

export function addIncome(income) {
  const incomes = getIncomes()

  const newIncome = {
    id: Date.now(),
    description: income.description,
    value: Number(income.value),
    date: income.date || new Date().toISOString()
  }

  incomes.push(newIncome)
  localStorage.setItem(INCOMES_KEY, JSON.stringify(incomes))

  return newIncome
}

export function getTotalIncomes() {
  return getIncomes().reduce((total, item) => total + item.value, 0)
}

/* ======================
   EXPENSES (Despesas)
====================== */

export function getExpenses() {
  return JSON.parse(localStorage.getItem(EXPENSES_KEY)) || []
}

export function addExpense(expense) {
  const expenses = getExpenses()

  const newExpense = {
    id: Date.now(),
    description: expense.description,
    value: Number(expense.value),
    date: expense.date || new Date().toISOString(),
    tipo: expense.tipo || 'geral'
  }

  expenses.push(newExpense)
  localStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses))

  return newExpense
}

export function getTotalExpenses() {
  return getExpenses().reduce((total, item) => total + item.value, 0)
}

/* ======================
   BALANCE (Saldo)
====================== */

export function getBalance() {
  return getTotalIncomes() - getTotalExpenses()
}