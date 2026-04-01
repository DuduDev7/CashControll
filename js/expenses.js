import { addExpense, getExpenses, deleteExpense, updateExpense } from './api.js'


async function adicionarDespesa() {
  const valor = document.getElementById('valor').value
  const fonte = document.getElementById('fonte').value
  const data = document.getElementById('data').value
  const tipo = document.getElementById('tipo').value
  const observacao = document.getElementById('observacao').value

  if (!valor || !fonte || !data || tipo === 'Selecione o tipo') {
    alert('Preencha todos os campos obrigatórios')
    return
  }

  if (Number(valor) <= 0) {
    alert('Valor inválido')
    return
  }

  const expense = {
    description: fonte,
    value: Number(valor),
    date: data,
    tipo: tipo,
    observacao: observacao
  }

  try {
    const novaDespesa = await addExpense(expense)
    renderExpense(novaDespesa)

    alert('Despesa adicionada!')

    document.getElementById('valor').value = ''
    document.getElementById('fonte').value = ''
    document.getElementById('data').value = ''
    document.getElementById('tipo').value = 'Selecione o tipo'
    document.getElementById('observacao').value = ''
  } catch (error) {
    console.error(error)
    alert('Erro ao adicionar despesa')
  }
}

async function editarDespesa(id) {
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
  
  const tipo = prompt('Novo tipo (essencial/variavel/financeiro/geral):') || 'geral'
  
  const expense = { description, value, date, tipo }
  
  try {
    await updateExpense(id, expense)
    location.reload()
  } catch (error) {
    alert('Erro ao editar')
  }
}

window.editarDespesa = editarDespesa


function renderExpense(expense) {
  let tabela

  switch (expense.tipo) {
    case 'essencial':
      tabela = document.querySelector('.tabela-essencial tbody')
      break
    case 'variavel':
      tabela = document.querySelector('.tabela-variaveis tbody')
      break
    case 'financeiro':
      tabela = document.querySelector('.tabela-financeiros tbody')
      break
    default:
      tabela = document.querySelector('.tabela-outros tbody')
  }

  const tr = document.createElement('tr')

  const [year, month, day] = expense.date.split('-')

  tr.innerHTML = `
    <td>R$ ${expense.value.toFixed(2)}</td>
    <td>${expense.description}</td>
    <td>${day}/${month}/${year}</td>
    <td>${expense.observacao || '-'}</td>
    <td>
      <button onclick="editarDespesa(${expense.id})" class="btn btn-sm btn-warning me-1">Editar</button>
      <button onclick="removerDespesa(${expense.id})" class="btn btn-sm btn-danger">X</button>
    </td>
  `


  tabela.appendChild(tr)
}

async function removerDespesa(id) {
  if (!confirm('Deseja excluir?')) return

  await deleteExpense(id)
  location.reload()
}

async function carregarDespesas() {
  const expenses = await getExpenses()

  expenses.forEach(renderExpense)
}

window.adicionarDespesa = adicionarDespesa
window.removerDespesa = removerDespesa

window.onload = carregarDespesas