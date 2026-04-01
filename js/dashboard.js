const token = localStorage.getItem('token')

if (!token) {
  alert('Você precisa estar logado')
  window.location.href = 'index.html'
}

import {
  getTotalIncomes,
  getTotalExpenses,
  getBalance
} from './api.js'

function nomeBemVindo() {
  try {
    const user = JSON.parse(localStorage.getItem('user'))
    const nome = user ? user.nome : 'Usuário'

    document.getElementById('nomeBemVindo').innerHTML = `Olá, ${nome}`
  } catch {
    document.getElementById('nomeBemVindo').innerHTML = 'Olá, Usuário'
  }
}

async function atualizarDados() {
  try {
    const resIncomes = await fetch('http://127.0.0.1:5000/api/incomes/total', {
      credentials: 'include'
    })

    const resExpenses = await fetch('http://127.0.0.1:5000/api/expenses/total', {
      credentials: 'include'
    })

    const dataIncomes = await resIncomes.json()
    const dataExpenses = await resExpenses.json()

    const totalIncomes = dataIncomes.total || 0
    const totalExpenses = dataExpenses.total || 0
    const balance = totalIncomes - totalExpenses

    const valorEntrou = document.getElementById('valorEntrou')
    const valorSaiu = document.getElementById('valorSaiu')
    const saldo = document.getElementById('saldo')

    if (valorEntrou)
      valorEntrou.innerText = 'R$ ' + totalIncomes.toFixed(2).replace('.', ',')

    if (valorSaiu)
      valorSaiu.innerText = 'R$ ' + totalExpenses.toFixed(2).replace('.', ',')

    if (saldo) {
      saldo.innerText = 'R$ ' + balance.toFixed(2).replace('.', ',')
      saldo.style.color = balance >= 0 ? '#10b981' : '#ef4444'
    }

  } catch (error) {
    console.error('Erro ao atualizar dados:', error)
  }
}

//logout
function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  window.location.href = 'index.html'
}

// Exporta funções globalmente
window.logout = logout

window.addEventListener('load', () => {
  nomeBemVindo()
  atualizarDados()
})