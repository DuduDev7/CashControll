import { getIncomes, deleteIncome } from './api.js'

const tbody = document.getElementById('listaIncomes')

function carregarHistorico() {
  const incomes = getIncomes()

  tbody.innerHTML = ''

  if (incomes.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; color: #94a3b8; padding: 20px;">Nenhuma receita cadastrada</td></tr>'
    return
  }

  incomes.forEach(income => {
    const tr = document.createElement('tr')
    const [year, month, day] = income.date.split('-')
    const dataFormatada = `${day}/${month}/${year}`

    tr.innerHTML = `
      <td>R$ ${Number(income.value).toFixed(2)}</td>
      <td>${income.description}</td>
      <td>${dataFormatada}</td>
      <td>${income.observacao || '-'}</td>
      <td><button class="btn btn-danger btn-sm" onclick="deletarReceita(${income.id})">X</button></td>
    `

    tbody.appendChild(tr)
  })
}

function deletarReceita(id) {
  if (confirm('Tem certeza que deseja excluir esta receita?')) {
    deleteIncome(id)
    carregarHistorico()
    mostrarMensagemSucesso('✅ Receita excluída com sucesso!')
  }
}

function mostrarMensagemSucesso(message) {
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
  }, 2500)
}

window.deletarReceita = deletarReceita

window.addEventListener('load', carregarHistorico)