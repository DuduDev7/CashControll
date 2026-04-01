import { getIncomes, deleteIncome, updateIncome } from './api.js'


const tbody = document.getElementById('listaIncomes')

async function carregarHistorico() {
  try {
    const incomes = await getIncomes()

    tbody.innerHTML = ''

    if (incomes.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5">Nenhuma receita cadastrada</td></tr>'
      return
    }

    incomes.forEach(income => {
      const tr = document.createElement('tr')

      const [year, month, day] = income.date.split('-')

      tr.innerHTML = `
        <td>R$ ${income.value.toFixed(2)}</td>
        <td>${income.description}</td>
        <td>${day}/${month}/${year}</td>
        <td>${income.observacao || '-'}</td>
        <td>
          <button onclick="editarReceita(${income.id})" class="btn btn-sm btn-warning me-1">Editar</button>
          <button onclick="deletarReceita(${income.id})" class="btn btn-sm btn-danger">X</button>
        </td>
      `


      tbody.appendChild(tr)
    })
  } catch (error) {
    console.error(error)
    tbody.innerHTML = '<tr><td colspan="5">Erro ao carregar</td></tr>'
  }
}

async function deletarReceita(id) {
  if (!confirm('Deseja excluir?')) return

  await deleteIncome(id)
  carregarHistorico()
}

async function editarReceita(id) {
  const description = prompt('Nova descrição:')
  if (description === null) return
  
  const valueStr = prompt('Novo valor:')
  const value = parseFloat(valueStr)
  if (isNaN(value) || value <= 0) {
    alert('Valor inválido')
    return
  }
  
  const date = prompt('Nova data (YYYY-MM-DD):')
  if (!date) return
  
  const income = { description, value, date }
  
  try {
    await updateIncome(id, income)
    carregarHistorico()
  } catch (error) {
    alert('Erro ao editar')
  }
}

window.deletarReceita = deletarReceita
window.editarReceita = editarReceita
window.onload = carregarHistorico

