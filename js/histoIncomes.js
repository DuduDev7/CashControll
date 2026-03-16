import { getIncomes, deleteIncome } from './api.js'

const tbody = document.getElementById('listaIncomes')

async function carregarHistorico() {
  try {
    const incomes = await getIncomes()

    tbody.innerHTML = ''

    if (incomes.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; color: #94a3b8; padding: 20px;">Nenhuma receita cadastrada</td></tr>'
      return
    }

    incomes.forEach(income => {
      const tr = document.createElement('tr')
      const [year, month, day] = income.data.split('-')
      const dataFormatada = `${day}/${month}/${year}`

      tr.innerHTML = `
        <td>R$ ${Number(income.valor).toFixed(2)}</td>
        <td>${income.descricao}</td>
        <td>${dataFormatada}</td>
        <td>${income.observacao || '-'}</td>
        <td><button class="btn btn-danger btn-sm" onclick="deletarReceita(${income.income_id})">X</button></td>
      `

      tbody.appendChild(tr)
    })
  } catch (error) {
    console.error('Erro ao carregar histórico:', error)
    tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; color: #ef4444; padding: 20px;">Erro ao carregar receitas</td></tr>'
  }
}

async function deletarReceita(id) {
  if (confirm('Tem certeza que deseja excluir esta receita?')) {
    try {
      await deleteIncome(id)
      carregarHistorico()
      mostrarMensagemSucesso('✅ Receita excluída com sucesso!')
    } catch (error) {
      mostrarMensagemErro('❌ Erro ao excluir receita: ' + error.message)
    }
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

function mostrarMensagemErro(message) {
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

window.deletarReceita = deletarReceita

window.addEventListener('load', carregarHistorico)