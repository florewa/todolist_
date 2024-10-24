<script setup>
import { ref, computed } from 'vue'

import VInput from '@/components/VInput.vue'
import VCheckbox from '@/components/VCheckbox.vue'
import VSelect from '@/components/VSelect.vue'

const list = ref([
  { id: 1, title: 'Задача 1', checked: false },
  { id: 2, title: 'Задача 2', checked: true },
  { id: 3, title: 'Задача 3', checked: false },
])

// Поле для поиска
const value = ref('')

// Опции для фильтрации: Все, Выполненные, Невыполненные
const options = ref(['All', 'Checked', 'Unchecked'])
const selectedOption = ref('All') // По умолчанию отображаем все задачи

// Фильтруем задачи в зависимости от выбранного значения в селекте
const filteredList = computed(() => {
  if (selectedOption.value === 'Checked') {
    return list.value.filter((task) => task.checked) // Только выполненные задачи
  } else if (selectedOption.value === 'Unchecked') {
    return list.value.filter((task) => !task.checked) // Только невыполненные задачи
  }
  return list.value // Все задачи
})

// Функция для поиска по списку задач
const searchList = computed(() => {
  if (!value.value) return filteredList.value
  return filteredList.value.filter((task) =>
    task.title.toLowerCase().includes(value.value.toLowerCase())
  )
})
</script>

<template>
  <div class="page">
    <div class="page-container">
      <div class="page-title">TODO LIST</div>
      <div class="page-menu">
        <div class="page-search">
          <VInput v-model="value" placeholder="Search note..." />
        </div>
        <div class="page-select">
          <VSelect v-model="selectedOption" :options="options" />
        </div>
      </div>
      <div class="page-list">
        <!-- Отображаем задачи на основе фильтрации и поиска -->
        <TransitionGroup name="slide">
          <div v-for="item in searchList" :key="item.id" class="item">
            <VCheckbox v-model="item.checked" />
            <div
              class="item-title"
              :style="{ textDecoration: item.checked ? 'line-through' : 'none' }"
            >
              {{ item.title }}
            </div>
          </div>
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/variables';

.page {
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 40px 0;

  &-container {
    width: 750px;
    margin: 0 auto;
  }

  &-title {
    font-size: 20px;
    font-weight: 500;
    padding-bottom: 18px;
    text-align: center;
  }

  &-menu {
    display: flex;
    gap: 16px;
  }

  &-search {
    flex: 1;
  }

  &-select {
    flex: 0 0 150px;
  }

  &-list {
    padding: 30px 0;

    .item {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px 0;
      border-bottom: 1px solid $primary;

      &:last-child {
        border-bottom: none;
      }

      &-title {
        flex: 1;
      }
    }
  }
}
</style>
