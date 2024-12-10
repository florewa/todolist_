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
    errorMessage.value = 'An error has occurred. Try again.'
  }
}
</script>

<template>
  <div class="popup">
    <div class="popup-content">
      <div class="popup-content-title">Register</div>
      <form class="popup-content-form" @submit.prevent="handleRegister">
        <div class="popup-content-inputs">
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
          <input
            id="confirm-password"
            v-model="confirmPassword"
            type="password"
            placeholder="Confirm password:"
            required
          />
        </div>
        <p v-if="errorMessage" style="margin-bottom: 10px; color: red">
          {{ errorMessage }}
        </p>
        <div class="popup-content-buttons">
          <button class="register" type="submit">Register</button>
          <button class="cancel" type="button" @click="closePopup">
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/variables';

.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  &-content {
    background: #fff;
    padding: 18px 30px;
    width: 600px;
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
    }

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

      .register {
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

      .cancel {
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
