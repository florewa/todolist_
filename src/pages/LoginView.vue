<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import RegisterPopup from '@/components/RegisterPopup.vue'

const email = ref('')
const password = ref('')
const showRegisterPopup = ref(false) // Управление отображением popup
const router = useRouter()

// Логика логина
const handleLogin = async () => {
  const API = window.API
  try {
    const response = await axios.post(`${API}/tasks/auth.php`, {
      email: email.value,
      password: password.value,
    })

    if (response.data.success) {
      sessionStorage.setItem('user_id', response.data.user_id)
      sessionStorage.getItem('user_id')
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
    <form @submit.prevent="handleLogin">
      <div>
        <label for="email">Email:</label>
        <input id="email" v-model="email" type="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input id="password" v-model="password" type="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <button @click="showRegisterPopup = true">Register</button>

    <RegisterPopup
      v-if="showRegisterPopup"
      @close="showRegisterPopup = false"
    />
  </div>
</template>
