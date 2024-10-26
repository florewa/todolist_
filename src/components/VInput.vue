<script setup>
import { ref } from 'vue'

defineProps({
  modelValue: String,
  placeholder: String,
  type: String,
  icon: String,
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
    <img v-if="icon" :src="icon" class="input-icon" />
  </div>
</template>

<style lang="scss">
@import '@/assets/scss/variables';
@import '@/assets/scss/css';

.input {
  position: relative;
  input {
    width: 100%;
    height: 38px;
    font-family: $fontSecond;
    border-radius: 8px;
    border: var(--input-border);
    padding: 11px 16px;
    color: var(--text-color);
    background: transparent;
  }
  img {
    width: 21px;
    height: 21px;
    bottom: 8.5px;
    right: 16px;
    position: absolute;
    pointer-events: none;
  }
}
</style>
