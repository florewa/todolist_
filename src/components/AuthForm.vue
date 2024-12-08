<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()

const handleSubmit = async () => {
  const API = window.API
  try {
    const response = await axios.post(`${API}/tasks/auth.php`, {
      email: email.value,
      password: password.value,
    })

    // Проверяем, что вернул сервер
    if (response.data.success) {
      // Если сервер вернул успех, сохраняем токен и перенаправляем
      localStorage.setItem('token', response.data.token)
      // eslint-disable-next-line no-alert
      alert('Успешный вход!')
      await router.push('/dashboard')
    } else {
      // Если сервер вернул ошибку, выводим сообщение
      // eslint-disable-next-line no-alert
      alert('Ошибка: ' + response.data.message)
    }
  } catch (error) {
    console.error('Ошибка при авторизации:', error)
    // eslint-disable-next-line no-alert
    alert('Произошла ошибка. Проверьте подключение к серверу.')
  }
}
</script>

<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="email">Email:</label>
        <input id="email" v-model="email" type="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input id="password" v-model="password" type="password" required />
      </div>
      <button type="submit">Login</button>
      <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p>
    </form>
  </div>
</template>
