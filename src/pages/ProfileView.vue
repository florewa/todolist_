<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import * as colorette from 'colorette'

const currentUserName = ref('')
const editableUserName = ref('')
const router = useRouter()

const toBack = () => {
  router.push('/dashboard')
}

// Загрузка текущего имени из backend
const loadUserName = async () => {
  const userId = sessionStorage.getItem('user_id')
  if (!userId) {
    router.push('/')
    return
  }
  try {
    const response = await axios.get(`${window.API}/tasks/get_name.php`, {
      params: { id: userId },
    })
    currentUserName.value = response.data.name || 'Анонимный пользователь'
    console.log(currentUserName.value)
  } catch (error) {
    console.error('Ошибка при загрузке имени:', error)
  }
}

// Обновление имени пользователя
const updateUserName = async () => {
  const userId = sessionStorage.getItem('user_id')
  if (!userId) {
    router.push('/')
    return
  }
  try {
    const response = await axios.post(
      `${window.API}/tasks/update_name.php`,
      { id: userId, name: editableUserName.value },
      { headers: { 'Content-Type': 'application/json' } }
    )
    if (response.data.success) {
      currentUserName.value = editableUserName.value
      editableUserName.value = ''
      alert('Имя успешно обновлено!')
    } else {
      alert('Ошибка при обновлении имени!')
    }
  } catch (error) {
    console.error('Ошибка при обновлении имени:', error)
  }
}
const color = ref('red')
onMounted(() => loadUserName())
</script>

<template>
  <div class="profile-page">
    <h1>Профиль</h1>
    <button
      :style="{ position: 'absolute', top: '0', left: '0', color: color }"
      @click="toBack"
    >
      Назад
    </button>
    <div class="profile-form">
      <label for="username">Ваше имя: {{ currentUserName }}</label>
      <input
        id="username"
        v-model="editableUserName"
        type="text"
        placeholder="Введите ваше новое имя"
      />
      <button @click="updateUserName">Сохранить</button>
    </div>
  </div>
</template>

<style scoped>
.profile-page {
  padding: 20px;
  max-width: 400px;
  margin: 50px auto;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
}

.profile-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.profile-form label {
  font-weight: bold;
  color: #333;
}

.profile-form input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.profile-form button {
  padding: 10px 15px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.profile-form button:hover {
  background-color: #45a049;
}

.profile-form button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
