<script setup>
import VToggle from '@/components/VToggle.vue'
import { useRouter } from 'vue-router'
import { useStateStore } from '@/store/stateStore'

const props = defineProps({
  theme: String
})

const emit = defineEmits(['toggleTheme'])
const router = useRouter()

const logout = () => {
  sessionStorage.clear()
  router.push('/')
}

const toProfile = () => {
  router.push('/profile')
}

const handleThemeToggle = (newTheme) => {
  emit('toggleTheme', newTheme)
}
</script>

<template>
  <div class="page-title">TODO LIST</div>
  <div class="page-menu">
    <div class="page-toggle">
      <VToggle :theme="theme" @toggle-theme="handleThemeToggle" />
    </div>
    <div @click="logout" class="logout-button">Log out</div>
    <div @click="toProfile" class="profile-button">Profile</div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/variables';

.page {
  &-title {
    font-size: 20px;
    font-weight: 500;
    padding-bottom: 18px;
    text-align: center;
  }

  &-menu {
    display: flex;
    margin-bottom: 20px;
    gap: 16px;
    justify-content: flex-end;
  }
}

.logout-button {
  text-transform: uppercase;
  background: #f44;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #d33;
  }
}

.profile-button {
  text-transform: uppercase;
  background: #f90;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #c90;
  }
}
</style> 