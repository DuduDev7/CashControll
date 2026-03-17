// URL base da API
const API_URL = '/api'

// Função auxiliar para fazer requisições
async function makeRequest(endpoint, method = 'GET', data = null) {
  const token = localStorage.getItem('token')
  
  const headers = {
    'Content-Type': 'application/json'
  }
  
  // Adiciona token se existir
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  
  const options = {
    method,
    headers
  }
  
  if (data) {
    options.body = JSON.stringify(data)
  }
  
  try {
    const response = await fetch(`${API_URL}${endpoint}`, options)
    const result = await response.json()
    
    if (!response.ok) {
      throw new Error(result.error || 'Erro na requisição')
    }
    
    return result
  } catch (error) {
    console.error('Erro:', error)
    throw error
  }
}

/* ======================
   INCOMES (Receitas)
====================== */

export async function getIncomes() {
  try {
    const result = await makeRequest('/incomes')
    return result.receitas || []
  } catch (error) {
    console.error('Erro ao buscar receitas:', error)
    return []
  }
}

export async function addIncome(income) {
  try {
    const result = await makeRequest('/incomes', 'POST', {
      descricao: income.description,
      valor: income.value,
      data: income.date,
      observacao: income.observacao || ''
    })
    return result.receita
  } catch (error) {
    console.error('Erro ao adicionar receita:', error)
    throw error
  }
}

export async function updateIncome(incomeId, income) {
  try {
    const result = await makeRequest(`/incomes/${incomeId}`, 'PUT', {
      descricao: income.description,
      valor: income.value,
      data: income.date,
      observacao: income.observacao || ''
    })
    return result
  } catch (error) {
    console.error('Erro ao atualizar receita:', error)
    throw error
  }
}

export async function deleteIncome(incomeId) {
  try {
    await makeRequest(`/incomes/${incomeId}`, 'DELETE')
  } catch (error) {
    console.error('Erro ao deletar receita:', error)
    throw error
  }
}

export async function getTotalIncomes() {
  try {
    const receitas = await getIncomes()
    return receitas.reduce((total, item) => total + item.valor, 0)
  } catch (error) {
    console.error('Erro ao calcular total de receitas:', error)
    return 0
  }
}

/* ======================
   EXPENSES (Despesas)
====================== */

export async function getExpenses() {
  try {
    const result = await makeRequest('/expenses')
    return result.despesas || []
  } catch (error) {
    console.error('Erro ao buscar despesas:', error)
    return []
  }
}

export async function addExpense(expense) {
  try {
    const result = await makeRequest('/expenses', 'POST', {
      descricao: expense.description,
      valor: expense.value,
      categoria: expense.tipo,
      data: expense.date,
      observacao: expense.observacao || ''
    })
    return result.despesa
  } catch (error) {
    console.error('Erro ao adicionar despesa:', error)
    throw error
  }
}

export async function updateExpense(expenseId, expense) {
  try {
    const result = await makeRequest(`/expenses/${expenseId}`, 'PUT', {
      descricao: expense.description,
      valor: expense.value,
      categoria: expense.tipo,
      data: expense.date,
      observacao: expense.observacao || ''
    })
    return result
  } catch (error) {
    console.error('Erro ao atualizar despesa:', error)
    throw error
  }
}

export async function deleteExpense(expenseId) {
  try {
    await makeRequest(`/expenses/${expenseId}`, 'DELETE')
  } catch (error) {
    console.error('Erro ao deletar despesa:', error)
    throw error
  }
}

export async function getExpensesByType(tipo) {
  try {
    const despesas = await getExpenses()
    return despesas.filter(expense => expense.categoria === tipo)
  } catch (error) {
    console.error('Erro ao filtrar despesas por tipo:', error)
    return []
  }
}

export async function getTotalExpenses() {
  try {
    const despesas = await getExpenses()
    return despesas.reduce((total, item) => total + item.valor, 0)
  } catch (error) {
    console.error('Erro ao calcular total de despesas:', error)
    return 0
  }
}

export async function getTotalExpensesByType(tipo) {
  try {
    const despesas = await getExpensesByType(tipo)
    return despesas.reduce((total, item) => total + item.valor, 0)
  } catch (error) {
    console.error('Erro ao calcular despesas por tipo:', error)
    return 0
  }
}

/* ======================
   BALANCE (Saldo)
====================== */

export async function getBalance() {
  try {
    const totalIncomes = await getTotalIncomes()
    const totalExpenses = await getTotalExpenses()
    return totalIncomes - totalExpenses
  } catch (error) {
    console.error('Erro ao calcular saldo:', error)
    return 0
  }
}