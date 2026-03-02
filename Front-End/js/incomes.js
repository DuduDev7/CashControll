//gestão de receitas

import { addIncome } from './api.js'

const form = document.querySelector('main')

form.addEventListener('submit', handleSubmit)

function handleSubmit(e) {
  e.preventDefault()

  const income = {
    description: document.getElementById('fonte').value.trim(),
    value: document.getElementById('valor').value,
    date: document.getElementById('data').value,
    observacao: document.getElementById('observacao').value.trim()
  }

  if (!validate(income)) return

  addIncome(income)

  alert('Receita cadastrada com sucesso!')

  form.reset()
}

function validate(income) {
  if (!income.description || !income.value || !income.date) {
    alert('Preencha todos os campos obrigatórios')
    return false
  }

  if (Number(income.value) <= 0) {
    alert('Valor inválido')
    return false
  }

  return true
}