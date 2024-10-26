<script setup>
import { ref } from 'vue'

defineProps({
  modelValue: String,
  placeholder: String,
  type: String,
})
const emits = defineEmits(['update:modelValue'])

const onInput = (e) => {
  emits('update:modelValue', e.target.value)
}

const click = () => {
  emits('click')
}
</script>

<template>
  <div class="input">
    <input
      @input="onInput"
      type="text"
      :value="modelValue"
      :placeholder="placeholder"
      :class="[type]"
    />
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/variables';

.input {
  input {
    height: 38px;
    font-family: $fontSecond;
    width: 100%;
    border-radius: 8px;
    border: 2px solid $primary;
    padding: 11px 16px;
    color: $primary;

    &::placeholder {
      color: #c3c1e5;
    }
  }
}
</style>
