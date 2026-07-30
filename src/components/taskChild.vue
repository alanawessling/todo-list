<script setup>
defineProps(['id', 'descricao', 'status'])
defineEmits(['editar', 'excluir', 'alternar'])
</script>

<template>
  <li class="task-item">
    <span
      class="task-text"
      :class="{ concluida: status === 'concluida' }"
      title="Clique para marcar como concluída/pendente"
      @click="$emit('alternar', id)"
    >
      {{ descricao }}
    </span>
    <span class="task-actions">
      <a href="#" @click.prevent="$emit('editar', id)">Editar</a>
      <a href="#" @click.prevent="$emit('excluir', id)">Excluir</a>
    </span>
  </li>
</template>

<style scoped>

</style>
