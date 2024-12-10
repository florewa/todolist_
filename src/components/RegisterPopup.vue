<script setup>
import { ref } from 'vue'
import axios from 'axios'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')
const emit = defineEmits(['close'])

const closePopup = () => {
  email.value = ''
  password.value = ''
  confirmPassword.value = ''
  errorMessage.value = ''
  emit('close')
}

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match'
    return
  }

  const API = window.API
  try {
    const response = await axios.post(`${API}/tasks/register.php`, {
      email: email.value.trim(),
      password: password.value.trim(),
    })

    if (response.data.success) {
      alert('Регистрация успешна! Теперь вы можете войти.')
      closePopup()
    } else {
      errorMessage.value = response.data.message
    }
  } catch (error) {
    console.error('Ошибка при регистрации:', error)
    errorMessage.value = 'Произошла ошибка. Попробуйте снова.'
  }
}
</script>

<template>
  <div class="popup">
    <div class="popup-content">
      <h2>Register</h2>
      <form @submit.prevent="handleRegister">
        <div>
          <label for="email">Email:</label>
          <input id="email" v-model="email" type="email" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input id="password" v-model="password" type="password" required />
        </div>
        <div>
          <label for="confirm-password">Confirm Password:</label>
          <input
            id="confirm-password"
            v-model="confirmPassword"
            type="password"
            required
          />
        </div>
        <button type="submit">Register</button>
        <button type="button" @click="closePopup">Cancel</button>
        <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<style scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>
