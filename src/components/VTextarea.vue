<script setup>
import { ref } from 'vue'

defineProps({
  modelValue: String,
  placeholder: String,
  rows: {
    type: Number,
    default: 5,
  },
})
const emits = defineEmits(['update:modelValue'])

const onInput = (e) => {
  emits('update:modelValue', e.target.value)
}
</script>

<template>
  <div class="textarea">
    <textarea
      @input="onInput"
      :value="modelValue"
      :placeholder="placeholder"
      :rows="rows"
    ></textarea>
  </div>
</template>

<style lang="scss">
@import '@/assets/scss/variables';
@import '@/assets/scss/css';

.textarea {
  position: relative;

  textarea {
    width: 291px;
    font-family: $fontSecond;
    border-radius: 8px;
    border: var(--input-border);
    padding: 11px 16px;
    color: var(--text-color);
    background: transparent;
    resize: none;
    font-size: 14px;
    line-height: 1.5;
    box-sizing: border-box;
  }
}
</style>
