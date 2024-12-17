<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStateStore } from '@/store/stateStore'
import VInput from '@/components/VInput.vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const store = useStateStore()
const router = useRouter()
const newUsername = ref('')
const currentUserName = ref('')
const error = ref('')
const success = ref(false)
const theme = ref(localStorage.getItem('theme') || 'light')

const isValidNewName = computed(() => {
  return (
    newUsername.value.trim() !== '' &&
    newUsername.value.trim() !== currentUserName.value
  )
})

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
  } catch (error) {
    console.error('Ошибка при загрузке имени:', error)
  }
}

const updateUserName = async () => {
  const userId = sessionStorage.getItem('user_id')
  if (!userId) {
    await router.push('/')
    return
  }
  try {
    const response = await axios.post(
      `${window.API}/tasks/update_name.php`,
      { id: userId, name: newUsername.value },
      { headers: { 'Content-Type': 'application/json' } }
    )
    if (response.data.success) {
      currentUserName.value = newUsername.value
      newUsername.value = ''
      success.value = true
      error.value = ''
    } else {
      error.value = 'Ошибка при обновлении имени!'
      success.value = false
    }
  } catch (error) {
    error.value = 'Ошибка при обновлении имени!'
    success.value = false
  }
}

const goBackToDashboard = () => {
  router.push('/dashboard')
}

onMounted(() => {
  loadUserName()
  document.body.className = theme.value
})
</script>

<template>
  <div class="profile" :class="theme">
    <div class="profile-container">
      <div class="profile-title">Profile</div>
      <div class="profile-content">
        <div class="profile-info">
          <div class="profile-username">
            Your current name: {{ currentUserName }}
          </div>
          <div class="profile-input">
            <VInput v-model="newUsername" placeholder="New username" />
          </div>
          <div v-if="error" class="profile-error">
            {{ error }}
          </div>
          <div v-if="success" class="profile-success">
            The name has been successfully updated!
          </div>
          <button
            class="profile-button"
            @click="updateUserName"
            :disabled="!isValidNewName"
            :class="{ 'profile-button--disabled': !isValidNewName }"
          >
            Update username
          </button>
          <button class="profile-back-button" @click="goBackToDashboard">
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/variables';
@import '@/assets/scss/css';

.profile {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--background);
  color: var(--text-color);
  padding: 20px;

  &-container {
    border-radius: 12px;
    padding: 30px;
    width: 100%;
    max-width: 500px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &-title {
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 30px;
    text-align: center;
    color: var(--text-color);
  }

  &-content {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }

  &-username {
    font-size: 18px;
    font-weight: 500;
    color: var(--text-color);
    padding: 10px 20px;
    border-radius: 8px;
    border: 1px solid var(--border-color);
  }

  &-input {
    width: 100%;
    max-width: 300px;
  }

  &-button {
    margin-top: 20px;
    padding: 12px 24px;
    background-color: $primary;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.3s ease;
    min-width: 200px;
    text-transform: uppercase;
    letter-spacing: 0.5px;

    &:hover:not(:disabled) {
      background-color: darken($primary, 10%);
      box-shadow: 0 4px 12px rgba($primary, 0.2);
    }

    &--disabled {
      background-color: #ccc;
      cursor: not-allowed;
      opacity: 0.7;
      transform: none !important;
      box-shadow: none !important;
    }
  }

  &-error {
    color: #f44336;
    font-size: 14px;
    margin-top: 8px;
    text-align: center;
  }

  &-success {
    color: #4caf50;
    font-size: 14px;
    margin-top: 8px;
    text-align: center;
  }

  &-back-button {
    margin-top: 10px;
    padding: 10px 20px;
    background-color: $secondary;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.3s ease;
    min-width: 200px;
    text-transform: uppercase;
    letter-spacing: 0.5px;

    &:hover {
      background-color: darken($secondary, 10%);
    }
  }

  &-theme-button {
    margin-top: 10px;
    padding: 10px 20px;
    background-color: $primary;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.3s ease;
    min-width: 200px;
    text-transform: uppercase;
    letter-spacing: 0.5px;

    &:hover {
      background-color: darken($primary, 10%);
    }
  }
}
</style>
