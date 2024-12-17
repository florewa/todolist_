<script setup>
defineEmits(['click'])
</script>

<template>
  <button class="add-task" @click="$emit('click')">
    <img src="/img/plus.png" alt="" />
  </button>
</template>

<style scoped lang="scss">
@import '@/assets/scss/variables';

.add-task {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: $primary;
  color: white;
  border: none;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;

  img {
    object-position: center;
  }

  &:hover {
    background-color: darken($primary, 10%);
  }
}
</style> 