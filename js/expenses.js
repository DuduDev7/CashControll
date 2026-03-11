import { addExpense } from './api.js'

function adicionarDespesa() {
  const valor = document.getElementById('valor')?.value.trim() || ''
  const fonte = document.getElementById('fonte')?.value.trim() || ''
  const data = document.getElementById('data')?.value.trim() || ''
  const tipo = document.getElementById('tipo')?.value || 'Selecione o tipo'
  const observacao = document.getElementById('observacao')?.value.trim() || ''

  // Validação de campos vazios
  if (!valor || !fonte || !data || tipo === 'Selecione o tipo') {
    showErrorMessage('⚠️ Existem campos vazios! Preencha todos os campos obrigatórios.')
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
    observacao: observacao,
    id: Date.now()
  }

  addExpense(expense)
  renderExpenseInTable(expense)

  showSuccessMessage(`✅ Despesa adicionada em "${getTipoLabel(tipo)}"!`)

  document.getElementById('valor').value = ''
  document.getElementById('fonte').value = ''
  document.getElementById('data').value = ''
  document.getElementById('tipo').value = 'Selecione o tipo'
  document.getElementById('observacao').value = ''

  return false
}

function getTipoLabel(tipo) {
  const labels = {
    'essencial': '📌 Essencial',
    'variavel': '📊 Variável',
    'financeiro': '💰 Financeiro',
    'outros': '🔧 Outros'
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
    <td><button class="btn btn-danger btn-sm" onclick="deleteExpenseRow(this, ${expense.id})">X</button></td>
  `

  tabela.appendChild(tr)
}

function deleteExpenseRow(btn, id) {
  if (confirm('Tem certeza que deseja excluir esta despesa?')) {
    btn.closest('tr').remove()
    let expenses = JSON.parse(localStorage.getItem('expenses')) || []
    expenses = expenses.filter(e => e.id !== id)
    localStorage.setItem('expenses', JSON.stringify(expenses))
    showSuccessMessage('✅ Despesa excluída com sucesso!')
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

function carregarDespesasSalvas() {
  let expenses = JSON.parse(localStorage.getItem('expenses')) || []
  
  expenses.forEach(expense => {
    renderExpenseInTable(expense)
  })
}

window.adicionarDespesa = adicionarDespesa
window.deleteExpenseRow = deleteExpenseRow

window.addEventListener('load', carregarDespesasSalvas)