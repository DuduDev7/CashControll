import {
  getTotalIncomes,
  getTotalExpenses,
  getBalance
} from './api.js'

function nomeBemVindo() {
  let usuario = JSON.parse(localStorage.getItem('usuarioLogado'))
  
  if (usuario && usuario.nome) {
    document.getElementById('nomeBemVindo').innerHTML = 'Olá, ' + usuario.nome
  } else {
    document.getElementById('nomeBemVindo').innerHTML = 'Olá, Usuário'
  }
}

function atualizarDados() {
  const totalIncomes = getTotalIncomes()
  const totalExpenses = getTotalExpenses()
  const balance = getBalance()

  const valorEntrou = document.getElementById('valorEntrou')
  const valorSaiu = document.getElementById('valorSaiu')
  const saldo = document.getElementById('saldo')

  if (valorEntrou) valorEntrou.innerText = 'R$ ' + totalIncomes.toFixed(2).replace('.', ',')
  if (valorSaiu) valorSaiu.innerText = 'R$ ' + totalExpenses.toFixed(2).replace('.', ',')
  if (saldo) {
    saldo.innerText = 'R$ ' + balance.toFixed(2).replace('.', ',')
    saldo.style.color = balance >= 0 ? '#10b981' : '#ef4444'
  }
}

window.addEventListener('load', () => {
  nomeBemVindo()
  atualizarDados()
})