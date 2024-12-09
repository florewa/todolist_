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
    console.log(response)

    if (response.data.success) {
      // Сохраняем user_id в sessionStorage или localStorage
      sessionStorage.setItem('user_id', response.data.user_id)

      alert('Успешный вход!')
      await router.push('/dashboard') // Перенаправляем на dashboard
    } else {
      alert('Ошибка: ' + response.data.message)
    }
  } catch (error) {
    console.error('Ошибка при авторизации:', error)
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
