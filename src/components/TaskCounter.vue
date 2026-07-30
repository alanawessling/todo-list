<script setup>
defineProps({
  pendentes: { type: Number, required: true },
  concluidas: { type: Number, required: true }
})
</script>

<template>
  <div class="counter">
    <span>Pendentes: <strong>{{ pendentes }}</strong></span>
    <span>Concluídas: <strong>{{ concluidas }}</strong></span>
  </div>
</template>

<style scoped>
.counter {
  margin-top: 28px;
  display: flex;
  gap: 20px;
  font-size: 14px;
}
</style>
