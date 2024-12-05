<script setup>
import { computed, ref } from 'vue'

const props = defineProps(['theme'])
const emits = defineEmits(['toggle-theme'])

const imageSrc = computed(() =>
  props.theme === 'light'
    ? '/img/Vector.svg'
    : '/img/Vector_dark.svg'
)

const toggleTheme = () => {
  const newTheme = props.theme === 'light' ? 'dark' : 'light'
  console.log('Текущая тема:', props.theme, 'Новая тема:', newTheme)
  emits('toggle-theme', newTheme)
}
</script>

<template>
  <div class="toggle-button">
    <button @click="toggleTheme">
      <img :src="imageSrc" />
    </button>
  </div>
</template>
<style scoped lang="scss">
@import '@/assets/scss/variables';

.toggle-button {
  padding: 8px;
  border-radius: 8px;
  width: 38px;
  height: 38px;
  background-color: $primary;

  img {
    pointer-events: none;
  }
}
</style>
