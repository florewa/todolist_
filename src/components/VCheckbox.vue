<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
  modelValue: Boolean, // Свойство для связи через v-model
})

const emits = defineEmits(['update:modelValue']) // Эмит событий

// Привязка локального состояния к modelValue
const isChecked = computed({
  get: () => props.modelValue, // Берем значение из props
  set: (value) => emits('update:modelValue', value), // Эмитим событие
})

// Переключение состояния при клике
const toggleCheck = () => {
  isChecked.value = !isChecked.value
}
</script>

<template>
  <div
    class="custom-checkbox"
    :class="{ checked: isChecked }"
    @click="toggleCheck"
  >
    <div v-if="isChecked" class="checkmark">
      <img src="/img/Rectangle%2018.png" alt="Checked" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/variables';
@import '@/assets/scss/css';

.custom-checkbox {
  width: 26px;
  height: 26px;
  border: var(--input-border);
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: var(--background);
  transition: background-color 0.3s, border-color 0.3s;

  &.checked {
    background: $primary;
  }

  .checkmark {
    color: white;
    font-size: 18px;
    line-height: 1;
  }
}
</style>
