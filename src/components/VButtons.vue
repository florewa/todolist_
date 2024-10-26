<script setup>
const props = defineProps({
  applyAction: Function,
  cancelAction: Function,
})

const onApply = () => {
  props.applyAction()
}

const onCancel = () => {
  props.cancelAction()
}
</script>

<template>
  <div class="buttons">
    <button class="cancel-button" @click="onCancel">Cancel</button>
    <button class="apply-button" @click="onApply">Apply</button>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/variables';
.buttons {
  display: flex;
  justify-content: space-between;
}

.apply-button {
  font-size: 18px;
  font-weight: 500;
  background-color: $primary;
  color: white;
  padding: 10px 22px;
  border-radius: 5px;
  cursor: pointer;
  text-transform: uppercase;

  &:hover {
    background-color: darken($primary, 10%);
  }
}

.cancel-button {
  font-size: 18px;
  font-weight: 500;
  background-color: white;
  color: $primary;
  border: 1px solid $primary;
  padding: 10px 22px;
  border-radius: 5px;
  cursor: pointer;
  text-transform: uppercase;

  &:hover {
    background-color: darken(white, 10%);
  }
}
</style>
