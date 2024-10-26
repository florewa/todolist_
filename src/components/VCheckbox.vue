<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: Boolean,
})

const emits = defineEmits(['update:modelValue'])

const isChecked = ref(props.modelValue)

// Следим за изменениями и отправляем их наверх
watch(isChecked, (newValue) => {
  emits('update:modelValue', newValue)
})

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
      <img src="src/assets/img/Rectangle%2018.png" alt="" />
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
