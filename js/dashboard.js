//nome(começo do dashboard)
function nomeBemVindo() {
  let usuario = JSON.parse(localStorage.getItem('usuarioLogado'));

  document.getElementById('nomeBemVindo').innerHTML = 'Olá, ' + usuario.nome;
}

import {
  getTotalIncomes,
  getTotalExpenses,
  getBalance
} from './api.js'

document.getElementById('total-incomes').innerText =
  getTotalIncomes().toFixed(2)

document.getElementById('total-expenses').innerText =
  getTotalExpenses().toFixed(2)

document.getElementById('balance').innerText =
  getBalance().toFixed(2)