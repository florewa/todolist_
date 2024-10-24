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
  <div v-outside="() => (isOpen = false)" class="select">
    <div class="select__header" @click="toggleDropdown">
      {{ selectedOption }}
      <span class="arrow" :class="{ open: isOpen }"
        ><img src="src/assets/img/chevron-top.png" alt="" />
      </span>
    </div>
    <ul v-if="isOpen" class="select__dropdown">
      <li
        v-for="option in options"
        :key="option"
        class="select__option"
        @click="selectOption(option)"
      >
        {{ option }}
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/variables';

.select {
  position: relative;
  cursor: pointer;
  user-select: none;

  &__header {
    padding: 0 15px;
    height: 48px;
    border: 2px solid $primary;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    background-color: $primary;
  }

  &__dropdown {
    position: absolute;
    width: 100%;
    background-color: white;
    border: 2px solid $primary;
    border-radius: 8px;
    z-index: 10;
    max-height: 200px;
    overflow-y: auto;
  }

  &__option {
    padding: 8px 6px;
    font-weight: 500;
    font-size: 16px;
    cursor: pointer;
    color: $primary;

    &:hover {
      background: rgba(108, 99, 255, 0.2);
    }
  }

  .arrow {
    width: 8px;
    height: 8px;
    transition: transform 0.2s ease;
  }

  .arrow.open {
    transform: rotate(180deg);
  }
}
</style>
