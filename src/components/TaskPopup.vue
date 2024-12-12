<script setup>
import { defineProps, defineEmits, reactive, watch } from 'vue'

const props = defineProps({
  show: Boolean, // Управляет видимостью попапа
  task: {
    type: Object,
    required: true, // Передаётся задача, которую редактируем
  },
})

const emit = defineEmits(['update:show', 'save']) // События для закрытия и сохранения

const editableTask = reactive({}) // Локальная копия задачи

// Создаём копию задачи для редактирования при её изменении
watch(
  () => props.task,
  (newTask) => {
    Object.assign(editableTask, newTask)
  },
  { immediate: true }
)

// Закрытие попапа
const closePopup = () => {
  emit('update:show', false) // Закрываем попап
}

// Сохранение изменений
const saveChanges = () => {
  emit('save', { ...editableTask }) // Отправляем обновлённую задачу
  closePopup() // Закрываем попап
}
</script>

<template>
  <div class="popup-overlay" v-if="show" @click.self="closePopup">
    <div class="popup">
      <h2>Редактировать задачу</h2>
      <label>
        Название:
        <input
          type="text"
          v-model="editableTask.title"
          placeholder="Введите название"
        />
      </label>
      <label>
        Описание:
        <textarea
          v-model="editableTask.description"
          placeholder="Введите описание"
          rows="5"
        ></textarea>
      </label>
      <label for="deadline">Deadline</label>
      <input
        type="datetime-local"
        v-model="editableTask.deadline"
        id="deadline"
        name="deadline"
      />
      <div class="popup-actions">
        <button @click="saveChanges">Сохранить</button>
        <button @click="closePopup">Отмена</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
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