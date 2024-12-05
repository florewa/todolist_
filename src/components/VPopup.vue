<script setup>
import { ref } from 'vue'
import VInput from '@/components/VInput.vue'
import VButtons from '@/components/VButtons.vue'

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
  const newTask = {
    title: newTaskTitle.value,
    description: 'Описание задачи',
    completed: 0,
  }
  emits('apply', newTask) // Передаём объект задачи
  closePopup()
}
</script>

<template>
  <transition name="fade">
    <div v-if="show" class="popup" @click="closePopup">
      <div class="popup-content" @click.stop>
        <div class="popup-content-title">New note</div>
        <div class="popup-content-input">
          <VInput v-model="newTaskTitle" placeholder="Input your note..." />
        </div>
        <div class="popup-content-buttons">
          <VButtons :applyAction="applyChanges" :cancelAction="closePopup" />
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss">
@import '@/assets/scss/variables';
@import '@/assets/scss/css';
.popup {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;

  &-content {
    background: var(--background);
    color: var(--text-color);
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
  }
}
</style>
