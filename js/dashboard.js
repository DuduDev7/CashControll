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
  let usuario = JSON.parse(localStorage.getItem('user'))
  
  if (usuario && usuario.user_name) {
    document.getElementById('nomeBemVindo').innerHTML = 'Olá, ' + usuario.user_name
  } else {
    document.getElementById('nomeBemVindo').innerHTML = 'Olá, Usuário'
  }
}

async function atualizarDados() {
  try {
    const totalIncomes = await getTotalIncomes()
    const totalExpenses = await getTotalExpenses()
    const balance = await getBalance()

    const valorEntrou = document.getElementById('valorEntrou')
    const valorSaiu = document.getElementById('valorSaiu')
    const saldo = document.getElementById('saldo')

    if (valorEntrou) valorEntrou.innerText = 'R$ ' + totalIncomes.toFixed(2).replace('.', ',')
    if (valorSaiu) valorSaiu.innerText = 'R$ ' + totalExpenses.toFixed(2).replace('.', ',')
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