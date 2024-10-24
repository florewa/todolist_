<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: String, // Текущее значение селекта
  options: Array, // Опции для выбора
})

const emits = defineEmits(['update:modelValue'])

const isOpen = ref(false) // Управляет открытием/закрытием списка опций
const selectedOption = ref(props.modelValue) // Текущее выбранное значение

// Переключение открытия списка
const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

// Выбор опции
const selectOption = (option) => {
  selectedOption.value = option
  emits('update:modelValue', option) // Обновляем значение в родительском компоненте
  isOpen.value = false // Закрываем список после выбора
}
</script>

<template>
  <div class="custom-select">
    <div class="custom-select__header" @click="toggleDropdown">
      {{ selectedOption || 'options' }}
      <span class="arrow" :class="{ open: isOpen }">▼</span>
    </div>

    <ul v-if="isOpen" class="custom-select__dropdown">
      <li
        v-for="option in options"
        :key="option"
        class="custom-select__option"
        @click="selectOption(option)"
      >
        {{ option }}
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/variables';

.custom-select {
  position: relative;
  cursor: pointer;
  user-select: none;

  &__header {
    padding: 10px 15px;
    border: 2px solid $primary;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
  }

  &__dropdown {
    position: absolute;
    width: 100%;
    margin-top: 5px;
    background-color: white;
    border: 2px solid $primary;
    border-radius: 8px;
    z-index: 10;
    max-height: 200px;
    overflow-y: auto;
  }

  &__option {
    padding: 10px 15px;
    cursor: pointer;

    &:hover {
      background-color: $primary;
      color: white;
    }
  }

  .arrow {
    transition: transform 0.2s ease;
  }

  .arrow.open {
    transform: rotate(180deg);
  }
}
</style>
