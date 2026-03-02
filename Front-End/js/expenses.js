//gestão de despesas

import { addExpense } from './api.js'

const form = document.querySelector('main')

form.addEventListener('submit', handleSubmit)

function handleSubmit(e) {
  e.preventDefault()

  const expense = {
    description: document.getElementById('fonte').value.trim(),
    value: document.getElementById('valor').value,
    date: document.getElementById('data').value,
    tipo: document.getElementById('tipo').value,
    observacao: document.getElementById('observacao').value.trim()
  }

  if (!validate(expense)) return

  addExpense(expense)

  renderExpenseInTable(expense)

  alert('Despesa cadastrada com sucesso!')

  form.reset()
}

function validate(expense) {
  if (!expense.description || !expense.value || !expense.date || !expense.tipo) {
    alert('Preencha todos os campos')
    return false
  }

  if (Number(expense.value) <= 0) {
    alert('Valor inválido')
    return false
  }

  return true
}

function renderExpenseInTable(expense) {
  let tabela

  switch (expense.tipo) {
    case '1':
      tabela = document.querySelector('.tabela-essencial')
      break
    case '2':
      tabela = document.querySelector('.tabela-variaveis')
      break
    case '3':
      tabela = document.querySelector('.tabela-financeiros')
      break
    default:
      tabela = document.querySelector('.tabela-outros')
  }

  const tr = document.createElement('tr')

  tr.innerHTML = `
    <td>R$ ${Number(expense.value).toFixed(2)}</td>
    <td>${expense.description}</td>
    <td>${expense.date}</td>
    <td>${expense.observacao || '-'}</td>
    <td><button class="btn btn-danger btn-sm">X</button></td>
  `

  tabela.appendChild(tr)
}

import { addExpense } from './api.js'

function adicionarDespesa() {
  const valor = document.getElementById('valor').value
  const fonte = document.getElementById('fonte').value
  const data = document.getElementById('data').value
  const tipo = document.getElementById('tipo').value
  const observacao = document.getElementById('observacao').value

  if (!valor || !fonte || !data || !tipo) {
    alert('Preencha todos os campos obrigatórios')
    return
  }

  const expense = {
    description: fonte,
    value: Number(valor),
    date: data,
    tipo: tipo,
    obs: observacao
  }

  addExpense(expense)

  window.location.href = 'histoExpenses.html'
}

window.adicionarDespesa = adicionarDespesa