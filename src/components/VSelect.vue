<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: String,
  options: Array,
})

const emits = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const selectedOption = ref(props.modelValue)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectOption = (option) => {
  selectedOption.value = option
  emits('update:modelValue', option)
  isOpen.value = false
}
</script>

<template>
  <div v-outside="() => (isOpen = false)" class="select">
    <div class="select-header" @click="toggleDropdown">
      {{ selectedOption }}
      <span class="arrow" :class="{ open: isOpen }"
        ><img src="../../public/img/chevron-top.png" alt="" />
      </span>
    </div>
    <transition name="fade">
      <ul v-if="isOpen" class="select-dropdown">
        <li
          v-for="option in options"
          :key="option"
          class="select-option"
          @click="selectOption(option)"
        >
          {{ option }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/variables';

.select {
  position: relative;
  cursor: pointer;
  user-select: none;

  &-header {
    height: 38px;
    padding: 10px;
    border: 2px solid $primary;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    background-color: $primary;
  }

  &-dropdown {
    position: absolute;
    width: 100%;
    background-color: white;
    border: 2px solid $primary;
    border-radius: 8px;
    z-index: 10;
    max-height: 200px;
    overflow-y: auto;
  }

  &-option {
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
