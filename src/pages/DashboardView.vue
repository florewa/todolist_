<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStateStore } from '@/store/stateStore'
import DashboardHeader from '@/components/dashboard/DashboardHeader.vue'
import SearchPanel from '@/components/dashboard/SearchPanel.vue'
import TaskList from '@/components/dashboard/TaskList.vue'
import TaskPopup from '@/components/TaskPopup.vue'
import VPopup from '@/components/VPopup.vue'
import AddTaskButton from '@/components/dashboard/AddTaskButton.vue'

const store = useStateStore()

// Состояния
const isTaskPopupOpen = ref(false)
const currentTask = ref(null)
const options = ref(['All', 'Checked', 'Unchecked'])
const selectedOption = ref('All')
const value = ref('')
const isPopupOpen = ref(false)
const theme = ref(localStorage.getItem('theme') || 'light')

const filteredList = computed(() => {
  let tasks = store.tasks

  if (selectedOption.value === 'Checked') {
    tasks = tasks.filter((task) => task.completed === 1)
  } else if (selectedOption.value === 'Unchecked') {
    tasks = tasks.filter((task) => task.completed === 0)
  }

  tasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline))

  return tasks
})

const searchList = computed(() => {
  if (!value.value) return filteredList.value
  return filteredList.value.filter((task) =>
    task.title.toLowerCase().includes(value.value.toLowerCase())
  )
})

const icon = computed(() =>
  theme.value === 'light' ? '/img/icon-light.png' : '/img/icon-dark.png'
)

// Методы
const openTaskPopup = (task) => {
  currentTask.value = { ...task }
  isTaskPopupOpen.value = true
}

const saveTaskChanges = async (updatedTask) => {
  try {
    await store.editTask(
      updatedTask.id,
      updatedTask.title,
      updatedTask.description,
      updatedTask.deadline
    )
    await store.readTasks()
  } catch (error) {
    console.error('Ошибка при сохранении задачи:', error)
  }
}

const createNewTask = async (newTask) => {
  try {
    await store.createTask(newTask)
  } catch (error) {
    console.error('Ошибка при создании задачи:', error)
  }
}

const deleteTask = (taskId) => {
  store.deleteTask(taskId)
}

const togglePopup = () => {
  isPopupOpen.value = !isPopupOpen.value
}

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  localStorage.setItem('theme', theme.value)
  document.body.className = theme.value
}

const getTaskStyle = (task) => {
  const today = new Date()
  const deadline = new Date(task.deadline)
  const diffTime = deadline - today
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays <= 1) {
    return 'task-red'
  } else if (diffDays <= 3) {
    return 'task-yellow'
  }
  return ''
}

// Хуки жизненного цикла
onMounted(async () => {
  try {
    await store.readTasks()
    document.body.className = theme.value
  } catch (error) {
    console.error('Ошибка при загрузке задач:', error)
  }
})
</script>

<template>
  <div class="page" :class="theme">
    <div class="page-container">
      <DashboardHeader :theme="theme" @toggle-theme="toggleTheme" />

      <SearchPanel
        :value="value"
        @update:value="(newValue) => (value = newValue)"
        :selectedOption="selectedOption"
        @update:selectedOption="(newValue) => (selectedOption = newValue)"
        :options="options"
        :icon="icon"
      />

      <TaskList
        :tasks="searchList"
        @edit-task="openTaskPopup"
        @delete-task="deleteTask"
        :get-task-style="getTaskStyle"
        selected-option=""
      />

      <TaskPopup
        v-model:show="isTaskPopupOpen"
        :task="currentTask"
        @save="saveTaskChanges"
      />

      <AddTaskButton @click="togglePopup" />

      <VPopup v-model:show="isPopupOpen" @apply="createNewTask" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/variables';
@import '@/assets/scss/css';

.page {
  background-color: var(--background);
  color: var(--text-color);
  display: flex;
  flex-direction: column;
  padding: 40px 0;
  transition: 0.3s all ease;
  min-height: 100vh;

  &-container {
    position: relative;
    width: 750px;
    height: 100%;
    margin: 0 auto;
  }
}
</style>
