import { getIncomes } from './api.js'

const tbody = document.getElementById('listaIncomes')

function carregarHistorico() {
  const incomes = getIncomes()

  // limpar tabela antes de renderizar novamente
  tbody.innerHTML = ''

  incomes.forEach(income => {
    const tr = document.createElement('tr')

    tr.innerHTML = `
      <td>${income.value}</td>
      <td>${income.description}</td>
      <td>${income.date}</td>
      <td>-</td>
    `

    tbody.appendChild(tr)
  })
}

window.onload = carregarHistorico
