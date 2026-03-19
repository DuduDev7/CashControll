const token = localStorage.getItem('token')

if (!token) {
  alert('Você precisa estar logado')
  window.location.href = 'index.html'
}

import { addIncome } from './api.js'

const form = document.querySelector('#incomeForm')

if (form) {
  form.addEventListener('submit', handleSubmit)
}

async function handleSubmit(e) {
  e.preventDefault()

  const valor = document.getElementById('valor')?.value.trim() || ''
  const fonte = document.getElementById('fonte')?.value.trim() || ''
  const data = document.getElementById('data')?.value.trim() || ''
  const observacao = document.getElementById('observacao')?.value.trim() || ''

  const income = {
    description: fonte,
    value: valor,
    date: data,
    observacao: observacao
  }

  if (!validate(income)) return

  try {
    await addIncome(income)
    showSuccessMessage('✅ Receita adicionada com sucesso!', () => {
      setTimeout(() => {
        window.location.href = 'histoIncomes.html'
      }, 500)
    })
  } catch (error) {
    showErrorMessage('❌ Erro ao adicionar receita: ' + error.message)
  }

  form.reset()
}

function validate(income) {
  if (!income.description || !income.value || !income.date) {
    showErrorMessage('⚠️ Existem campos vazios! Preencha todos os campos obrigatórios.')
    return false
  }

  if (Number(income.value) <= 0) {
    showErrorMessage('❌ Valor inválido. Digite um valor maior que 0.')
    return false
  }

  return true
}

function showSuccessMessage(message, callback) {
  const alertDiv = document.createElement('div')
  alertDiv.className = 'alert-custom success'
  alertDiv.innerHTML = `
    <div class="alert-content">
      <p>${message}</p>
      <small>Redirecionando para o histórico...</small>
    </div>
  `
  document.body.appendChild(alertDiv)
  
  setTimeout(() => {
    alertDiv.classList.add('show')
  }, 100)
  
  if (callback) callback()
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