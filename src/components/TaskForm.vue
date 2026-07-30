<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  valorInicial: { type: String, default: '' },
  emEdicao: { type: Boolean, default: false }
})
const emit = defineEmits(['salvar'])

const texto = ref(props.valorInicial)

watch(() => props.valorInicial, (novo) => {
  texto.value = novo
})

function salvar() {
  const valor = texto.value.trim()
  if (!valor) return
  emit('salvar', valor)
  texto.value = ''
}
</script>

<template>
  <div class="task-form">
    <input
      type="text"
      v-model="texto"
      placeholder="Nova tarefa..."
      @keyup.enter="salvar"
    />
    <button @click="salvar">{{ emEdicao ? 'Salvar' : 'Add' }}</button>
  </div>
</template>

<style scoped>

</style>
