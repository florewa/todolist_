<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import RegisterPopup from '@/components/RegisterPopup.vue'
import VButtons from '@/components/VButtons.vue'

const email = ref('')
const password = ref('')
const showRegisterPopup = ref(false)
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
      await router.push('/dashboard')
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
  <div class="container">
    <div class="container-title">LOG IN</div>
    <form class="container-form" @submit.prevent="handleLogin">
      <div class="container-form-inputs">
        <input
          id="email"
          v-model="email"
          type="email"
          placeholder="Email:"
          required
        />
        <input
          id="password"
          v-model="password"
          type="password"
          placeholder="Password:"
          required
        />
      </div>
      <div class="container-form-buttons">
        <button class="login" type="submit">Log in</button>
        <button class="register" @click="showRegisterPopup = true">
          Register
        </button>
      </div>
    </form>

    <RegisterPopup
      v-if="showRegisterPopup"
      @close="showRegisterPopup = false"
    />
  </div>
</template>
<style scoped lang="scss">
@import '@/assets/scss/variables';
.container {
  margin-top: 150px;
  padding: 18px 30px;
  width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 3px solid #6c63ff;
  border-radius: 30px;

  &-title {
    font-weight: 500;
    font-size: 24px;
    line-height: 100%;
    text-transform: uppercase;
    margin-bottom: 25px;
  }

  &-form {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &-inputs {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 85px;

      input {
        border: 1px solid #6c63ff;
        border-radius: 5px;
        padding: 8px 16px;
      }
    }

    &-buttons {
      width: 100%;
      display: flex;
      justify-content: space-between;

      .login {
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

      .register {
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
  }
}
</style>