<script setup>
import { ref } from 'vue'
import VInput from '@/components/VInput.vue'

defineProps({
  show: Boolean,
})
const emits = defineEmits(['update:show', 'apply'])

const newTaskTitle = ref('')

const closePopup = () => {
  emits('update:show', false)
  newTaskTitle.value = ''
}

const applyChanges = () => {
  emits('apply', newTaskTitle.value)
  closePopup()
}
</script>

<template>
  <transition name="fade">
    <div v-if="show" class="popup" @click.self="closePopup">
      <div class="popup-content">
        <div class="popup-content-title">New note</div>
        <div class="popup-content-input">
          <VInput v-model="newTaskTitle" placeholder="Input your note..." />
        </div>
        <div class="popup-content-buttons">
          <button class="cancel-button" @click="closePopup">Cancel</button>
          <button class="apply-button" @click="applyChanges">Apply</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped lang="scss">
@import '@/assets/scss/variables';

.popup {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;

  &-content {
    background-color: white;
    padding: 18px 30px;
    border-radius: 16px;
    width: 500px;
    text-align: center;

    &-title {
      font-size: 24px;
      font-weight: 500;
      text-transform: uppercase;
      margin-bottom: 25px;
    }

    &-input {
      margin-bottom: 128px;
    }

    &-buttons {
      display: flex;
      justify-content: space-between;

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
          background-color: white;
          color: $primary;
          border: 1px solid $primary;
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
          background-color: $primary;
          color: white;
        }
      }
    }
  }
}
</style>
