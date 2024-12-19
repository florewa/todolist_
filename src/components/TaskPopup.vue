<script setup>
import { defineProps, defineEmits, reactive, watch } from 'vue'
import VInput from '@/components/VInput.vue'
import VTextarea from '@/components/VTextarea.vue'

const props = defineProps({
  show: Boolean,
  task: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['update:show', 'save'])

const editableTask = reactive({})

watch(
  () => props.task,
  (newTask) => {
    Object.assign(editableTask, newTask)
  },
  { immediate: true }
)

const closePopup = () => {
  emit('update:show', false)
}
const errors = reactive({
  title: '',
  description: '',
  deadline: '',
})

const validateFields = () => {
  let isValid = true

  // Проверяем поле "title"
  if (!editableTask.title || !editableTask.title.trim()) {
    errors.title = 'The name of the task is required'
    isValid = false
  } else {
    errors.title = ''
  }

  // Проверяем поле "description"
  if (!editableTask.description || !editableTask.description.trim()) {
    errors.description = 'The task description is required'
    isValid = false
  } else {
    errors.description = ''
  }

  // Проверяем поле "deadline"
  if (!editableTask.deadline) {
    errors.deadline = 'The deadline date is required'
    isValid = false
  } else {
    errors.deadline = ''
  }

  return isValid
}

const saveChanges = () => {
  if (!validateFields()) {
    return
  }
  emit('save', { ...editableTask })
  closePopup()
}
</script>

<template>
  <div class="popup-overlay" v-if="show" @click.self="closePopup">
    <div class="popup">
      <h2>Edit a task</h2>
      <label>
        Название:
        <VInput
          type="text"
          v-model="editableTask.title"
          placeholder="Enter a name"
        />
      </label>
      <p v-if="errors.title" class="error-message">{{ errors.title }}</p>
      <label>
        Описание:
        <VTextarea
          v-model="editableTask.description"
          placeholder="Enter a description"
          rows="5"
        ></VTextarea>
      </label>
      <p v-if="errors.description" class="error-message">
        {{ errors.description }}
      </p>
      <label for="deadline">Deadline</label>
      <input
        type="datetime-local"
        v-model="editableTask.deadline"
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
      <p v-if="errors.deadline" class="error-message">{{ errors.deadline }}</p>
      <div class="popup-actions">
        <button class="btn-save" @click="saveChanges">Save</button>
        <button class="btn-cancel" @click="closePopup">Cancel</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/variables';
@import '@/assets/scss/css';
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.popup {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 400px;
  max-width: 90%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
}

.popup-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;

  .btn-save {
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

  .btn-cancel {
    font-size: 18px;
    font-weight: 500;
    background-color: transparent;
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
}

textarea,
input[type='text'] {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>