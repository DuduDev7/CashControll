const API_URL = 'http://127.0.0.1:5000/api'

// ==========================
// REQUEST BASE (SEM TOKEN)
// ==========================
async function makeRequest(endpoint, method = 'GET', data = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include' // 🔥 ESSENCIAL pro Flask session
  }

  if (data) {
    options.body = JSON.stringify(data)
  }

  const response = await fetch(`${API_URL}${endpoint}`, options)

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Erro na requisição')
  }

  return response.json()
}


// ==========================
// INCOMES
// ==========================

export async function getIncomes() {
  return await makeRequest('/incomes')
}

export async function addIncome(income) {
  return await makeRequest('/incomes', 'POST', {
    description: income.description,
    value: income.value,
    date: income.date
  })
}

export async function deleteIncome(id) {
  return await makeRequest(`/incomes/${id}`, 'DELETE')
}

export async function getTotalIncomes() {
  const res = await makeRequest('/incomes/total')
  return res.total || 0
}


// ==========================
// EXPENSES
// ==========================

export async function getExpenses() {
  return await makeRequest('/expenses')
}

export async function addExpense(expense) {
  return await makeRequest('/expenses', 'POST', {
    description: expense.description,
    value: expense.value,
    date: expense.date,
    tipo: expense.tipo
  })
}

export async function deleteExpense(id) {
  return await makeRequest(`/expenses/${id}`, 'DELETE')
}


export async function getTotalExpenses() {
  const res = await makeRequest('/expenses/total')
  return res.total || 0
}

// ==========================
// UPDATE CRUD
// ==========================

export async function updateIncome(id, income) {
  return await makeRequest(`/incomes/${id}`, 'PUT', income)
}

export async function updateExpense(id, expense) {
  return await makeRequest(`/expenses/${id}`, 'PUT', expense)
}

// ==========================
// USER PROFILE
// ==========================

export async function getMe() {
  return await makeRequest('/auth/me')
}

export async function updateUser(userData) {
  return await makeRequest('/auth/me', 'PUT', userData)
}


// ==========================
// BALANCE
// ==========================

export async function getBalance() {
  const incomes = await getTotalIncomes()
  const expenses = await getTotalExpenses()
  return incomes - expenses
}

