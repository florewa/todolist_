<script setup>
import { ref } from 'vue'
import VInput from '@/components/VInput.vue'
import VButtons from '@/components/VButtons.vue'

const titleError = ref('')
const deadlineError = ref('')

defineProps({
  show: Boolean,
})
const emits = defineEmits(['update:show', 'apply'])

const newTaskTitle = ref('')
const newTaskDeadline = ref('')

const validateFields = () => {
  let isValid = true

  if (!newTaskTitle.value.trim()) {
    titleError.value = 'Task title is required'
    isValid = false
  } else {
    titleError.value = ''
  }

  if (!newTaskDeadline.value) {
    deadlineError.value = 'Deadline is required'
    isValid = false
  } else {
    deadlineError.value = ''
  }

  return isValid
}

const closePopup = () => {
  emits('update:show', false)
  newTaskTitle.value = ''
  newTaskDeadline.value = ''
}

const applyChanges = () => {
  if (!validateFields()) {
    return
  }

  const newTask = {
    title: newTaskTitle.value,
    description: 'Описание задачи',
    completed: 0,
    deadline: newTaskDeadline.value,
  }
  console.log(newTask)
  emits('apply', newTask)
  closePopup()
}
</script>

<template>
  <transition name="fade">
    <div v-if="show" class="popup" @click="closePopup">
      <div class="popup-content" @click.stop>
        <div class="popup-content-title">New Task</div>
        <div class="popup-content-input">
          <VInput
            v-model="newTaskTitle"
            placeholder="Input your task title..."
          />
          <p v-if="titleError" class="error-message">{{ titleError }}</p>
        </div>
        <div class="popup-content-input">
          <label for="deadline">Deadline</label>
          <input
            type="datetime-local"
            v-model="newTaskDeadline"
            id="deadline"
            name="deadline"
            style="
              width: 100%;
              height: 38px;
              font-family: $fontSecond;
              border-radius: 8px;
              border: var(--input-border);
              padding: 11px 16px;
              color: var(--text-color);
              background: transparent;
            "
          />
          <p v-if="deadlineError" class="error-message">{{ deadlineError }}</p>
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
      margin-bottom: 20px;
    }
  }

  .error-message {
    color: red;
    font-size: 12px;
    margin-top: 4px;
    text-align: left;
  }
}
</style>
