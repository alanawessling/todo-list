<script setup>
defineProps({
  modelValue: { type: String, default: '' },
  podeRecuperar: { type: Boolean, default: false }
})
defineEmits(['update:modelValue', 'ordenar', 'recuperar'])
</script>

<template>
  <div class="filter-wrap">
    <input
      type="text"
      placeholder="Filtrar tarefas..."
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <div class="controls">
      <button @click="$emit('ordenar')">Ordenar</button>
      
    </div>
  </div>
</template>

<style scoped>

</style>
