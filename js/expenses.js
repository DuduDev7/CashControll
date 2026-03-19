const token = localStorage.getItem('token')

if (!token) {
  alert('Você precisa estar logado')
  window.location.href = 'index.html'
}

import { addExpense, deleteExpense, getExpenses } from './api.js'

async function adicionarDespesa() {
  const valor = document.getElementById('valor')?.value.trim() || ''
  const fonte = document.getElementById('fonte')?.value.trim() || ''
  const data = document.getElementById('data')?.value.trim() || ''
  const tipo = document.getElementById('tipo')?.value || 'Selecione o tipo'
  const observacao = document.getElementById('observacao')?.value.trim() || ''

  // Validação de campos vazios
  if (!valor || !fonte || !data || tipo === 'Selecione o tipo') {
    showErrorMessage(
      '⚠️ Existem campos vazios! Preencha todos os campos obrigatórios.'
    )
    return false
  }

  if (Number(valor) <= 0) {
    showErrorMessage('❌ Valor inválido. Digite um valor maior que 0.')
    return false
  }

  const expense = {
    description: fonte,
    value: Number(valor),
    date: data,
    tipo: tipo,
    observacao: observacao
  }

  try {
    const novaDespesa = await addExpense(expense)
    renderExpenseInTable(novaDespesa)

    showSuccessMessage(`✅ Despesa adicionada em "${getTipoLabel(tipo)}"!`)

    document.getElementById('valor').value = ''
    document.getElementById('fonte').value = ''
    document.getElementById('data').value = ''
    document.getElementById('tipo').value = 'Selecione o tipo'
    document.getElementById('observacao').value = ''
  } catch (error) {
    showErrorMessage('❌ Erro ao adicionar despesa: ' + error.message)
  }

  return false
}

function getTipoLabel(tipo) {
  const labels = {
    essencial: '📌 Essencial',
    variavel: '📊 Variável',
    financeiro: '💰 Financeiro',
    outros: '🔧 Outros'
  }
  return labels[tipo] || tipo
}

function renderExpenseInTable(expense) {
  let tabela

  switch (expense.tipo) {
    case 'essencial':
      tabela = document.querySelector('.tabela-essencial tbody')
      break
    case 'variavel':
      tabela = document.querySelector('.tabela-variaveis tbody')
      break
    case 'financeiro':
      tabela = document.querySelector('.tabela-financeiros tbody')
      break
    case 'outros':
      tabela = document.querySelector('.tabela-outros tbody')
      break
    default:
      tabela = document.querySelector('.tabela-outros tbody')
  }

  const tr = document.createElement('tr')
  const [year, month, day] = expense.date.split('-')
  const dataFormatada = `${day}/${month}/${year}`

  tr.innerHTML = `
    <td>R$ ${Number(expense.value).toFixed(2)}</td>
    <td>${expense.description}</td>
    <td>${dataFormatada}</td>
    <td>${expense.observacao || '-'}</td>
    <td><button class="btn btn-danger btn-sm" onclick="deleteExpenseRow(this, ${
      expense.expense_id
    })">X</button></td>
  `

  tabela.appendChild(tr)
}

async function deleteExpenseRow(btn, id) {
  if (confirm('Tem certeza que deseja excluir esta despesa?')) {
    try {
      await deleteExpense(id)
      btn.closest('tr').remove()
      showSuccessMessage('✅ Despesa excluída com sucesso!')
    } catch (error) {
      showErrorMessage('❌ Erro ao excluir despesa: ' + error.message)
    }
  }
}

function showSuccessMessage(message, callback) {
  const alertDiv = document.createElement('div')
  alertDiv.className = 'alert-custom success'
  alertDiv.innerHTML = `
    <div class="alert-content">
      <p>${message}</p>
    </div>
  `
  document.body.appendChild(alertDiv)

  setTimeout(() => {
    alertDiv.classList.add('show')
  }, 100)

  setTimeout(() => {
    alertDiv.remove()
    if (callback) callback()
  }, 2500)
}

function showErrorMessage(message) {
  const alertDiv = document.createElement('div')
  alertDiv.className = 'alert-custom error'
  alertDiv.innerHTML = `
    <div class="alert-content">
      <p>${message}</p>
    </div>
  `
  document.body.appendChild(alertDiv)

  setTimeout(() => {
    alertDiv.classList.add('show')
  }, 100)

  setTimeout(() => {
    alertDiv.remove()
  }, 4000)
}

async function carregarDespesasSalvas() {
  try {
    const expenses = await getExpenses()

    expenses.forEach(expense => {
      renderExpenseInTable(expense)
    })
  } catch (error) {
    console.error('Erro ao carregar despesas:', error)
  }
}

window.adicionarDespesa = adicionarDespesa
window.deleteExpenseRow = deleteExpenseRow

window.addEventListener('load', carregarDespesasSalvas)
