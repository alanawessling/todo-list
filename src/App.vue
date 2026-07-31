<script setup>
import { ref, computed, watch } from 'vue'
import taskChild from './components/taskChild.vue'
import TaskForm from './components/TaskForm.vue'
import FilterBar from './components/FilterBar.vue'
import TaskCounter from './components/TaskCounter.vue'

const STORAGE_KEY = 'lista-tarefas'
const TRASH_KEY = 'lista-tarefas-lixeira'

function carregarTarefas() {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (raw) {
    try {
      return JSON.parse(raw)
    } catch (e) {
      console.error('Não foi possível ler as tarefas salvas:', e)
    }
  }
  return [
    { id: 1, desc: 'Trabalho de DevWeb', status: 'pendente' },
    { id: 2, desc: 'Trabalho de Inglês', status: 'concluida' },
    { id: 3, desc: 'Prova de Matemática', status: 'pendente' }
  ]
}  

function carregarLixeira() {
  const raw = localStorage.getItem(TRASH_KEY)
  if (raw) {
    try {
      return JSON.parse(raw)
    } catch (e) {
      console.error('Não foi possível ler a lixeira salva:', e)
    }
  }
  return []
}

const tarefas = ref(carregarTarefas())
const lixeira = ref(carregarLixeira())

watch(tarefas, (novo) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(novo))
}, { deep: true })

watch(lixeira, (novo) => {
  localStorage.setItem(TRASH_KEY, JSON.stringify(novo))
}, { deep: true })

const novaTarefa = ref('')
const posicaoAlterar = ref(-1)
const filtro = ref('')
const ordemAsc = ref(true)

const tarefasPendentes = computed(() =>
  tarefas.value.filter(t => t.status === 'pendente').length
)

const tarefasConcluidas = computed(() =>
  tarefas.value.filter(t => t.status === 'concluida').length
)

const tarefasFiltradas = computed(() => {
  const termo = filtro.value.trim().toLowerCase()
  if (!termo) return tarefas.value
  return tarefas.value.filter(t => t.desc.toLowerCase().includes(termo))
})

function ordenar() {
  tarefas.value.sort((a, b) =>
    ordemAsc.value
      ? a.desc.localeCompare(b.desc, 'pt-BR')
      : b.desc.localeCompare(a.desc, 'pt-BR')
  )
  ordemAsc.value = !ordemAsc.value
}

function addTarefa(texto) {
  if (posicaoAlterar.value === -1) {
    const maiorID = tarefas.value.length
      ? Math.max(...tarefas.value.map(item => item.id))
      : 0
    tarefas.value.push({ id: maiorID + 1, desc: texto, status: 'pendente' })
  } else {
    tarefas.value[posicaoAlterar.value].desc = texto
    posicaoAlterar.value = -1
  }
}

function deleteTarefa(idTarefa) {
  const posicao = tarefas.value.findIndex(t => t.id === idTarefa)
  if (posicao === -1) return
  const [removida] = tarefas.value.splice(posicao, 1)
  lixeira.value.push(removida)
  if (posicaoAlterar.value === posicao) {
    posicaoAlterar.value = -1
    novaTarefa.value = ''
  }
}

function recuperarTarefa() {
  const restaurada = lixeira.value.pop()
  if (restaurada) tarefas.value.push(restaurada)
}

function editTarefa(idTarefa) {
  posicaoAlterar.value = tarefas.value.findIndex(t => t.id === idTarefa)
  novaTarefa.value = tarefas.value[posicaoAlterar.value].desc
}

function alternarStatus(id) {
  const tarefa = tarefas.value.find(t => t.id === id)
  if (!tarefa) return
  tarefa.status = tarefa.status === 'concluida' ? 'pendente' : 'concluida'
}
</script>

<template>
  <div class="container">
    <TaskForm
      :valor-inicial="novaTarefa"
      :em-edicao="posicaoAlterar !== -1"
      @salvar="addTarefa"
    />

    <ul>
      <taskChild
        v-for="tarefa in tarefasFiltradas"
        :key="tarefa.id"
        :id="tarefa.id"
        :descricao="tarefa.desc"
        :status="tarefa.status"
        @excluir="deleteTarefa"
        @editar="editTarefa"
        @alternar="alternarStatus"
      />
    </ul>

    <FilterBar
      v-model="filtro"
      :pode-recuperar="lixeira.length > 0"
      @ordenar="ordenar"
      @recuperar="recuperarTarefa"
    />

    <TaskCounter :pendentes="tarefasPendentes" :concluidas="tarefasConcluidas" />
  </div>
</template>

<style scoped>
.container {
  max-width: 360px;
  margin: 60px auto;
  font-family: -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  padding: 0 20px;
}

ul {
  list-style: none;
  margin: 0 0 16px;
  padding: 0;
}
</style>
