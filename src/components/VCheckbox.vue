<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: Boolean, // Управление состоянием чекбокса
})

const emits = defineEmits(['update:modelValue'])

const isChecked = ref(props.modelValue)

watch(isChecked, (newValue) => {
  emits('update:modelValue', newValue)
})
</script>

<template>
  <div class="check">
    <input type="checkbox" v-model="isChecked" class="check-input" />
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/variables';

.check {
  display: flex;
  align-items: center;

  &-input {
    width: 26px;
    height: 26px;
    cursor: pointer;
  }
}
</style>
