<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import VInput from '@/components/VInput.vue'
import VCheckbox from '@/components/VCheckbox.vue'
import VSelect from '@/components/VSelect.vue'
import VPopup from '@/components/VPopup.vue'
import VToggle from '@/components/VToggle.vue'
import { useStateStore } from '@/store/stateStore.js'
import { useRouter } from 'vue-router'

const store = useStateStore()
const router = useRouter()

onMounted(async () => {
  try {
    await store.readTasks()
  } catch (error) {
    console.error('Ошибка при загрузке задач:', error)
  }
})

const logout = () => {
  store.resetStore()
  sessionStorage.clear()
  router.push('/')
}

const options = ref(['All', 'Checked', 'Unchecked'])
const selectedOption = ref('ALL')
const value = ref('')

const filteredList = computed(() => {
  if (selectedOption.value === 'Checked') {
    return store.tasks.filter((task) => task.completed === 1)
  } else if (selectedOption.value === 'Unchecked') {
    return store.tasks.filter((task) => task.completed === 0)
  }
  return store.tasks
})

const createNewTask = async (newTask) => {
  await store.createTask(newTask)
}

const searchList = computed(() => {
  if (!value.value) return filteredList.value
  return filteredList.value.filter((task) =>
    task.title.toLowerCase().includes(value.value.toLowerCase())
  )
})

const editTask = (task) => {
  task.isEditing = true
  task.editTitle = task.title
}

const saveTask = (task) => {
  if (task.editTitle.trim()) {
    store.editTask(task.id, task.editTitle.trim())
    task.title = task.editTitle.trim()
    task.isEditing = false
  }
}

const cancelEdit = (task) => {
  task.isEditing = false
  task.editTitle = ''
}

const deleteTask = (taskId) => {
  store.deleteTask(taskId)
}

const isPopupOpen = ref(false)

const togglePopup = () => {
  isPopupOpen.value = !isPopupOpen.value
}

const theme = ref(localStorage.getItem('theme') || 'light')

const toggleTheme = (newTheme) => {
  theme.value = newTheme
  localStorage.setItem('theme', newTheme)

  const pageElement = document.querySelector('.page')
  if (pageElement) {
    pageElement.className = `page ${newTheme}`
  }
}

const toggleTaskStatus = async (task) => {
  console.log('Текущий статус задачи:', task.completed)
  task.completed = !task.completed
  console.log('Изменяем на:', task.completed)

  try {
    await store.updateTaskStatus(task.id, !task.completed)
    await store.readTasks()
    console.log('Статус успешно обновлен на сервере')
  } catch (error) {
    console.error('Ошибка при обновлении статуса задачи:', error)
  }
}

onMounted(() => {
  document.querySelector('.page').className = `page ${theme.value}`
})

const icon = computed(() =>
  theme.value === 'light' ? '/img/icon-light.png' : '/img/icon-dark.png'
)
</script>

<template>
  <transition name="fade">
    <div class="page" :class="theme">
      <div class="page-container">
        <div class="page-title">TODO LIST</div>
        <div class="page-menu">
          <div class="page-search">
            <VInput v-model="value" placeholder="Search note..." :icon="icon" />
          </div>
          <div class="page-select">
            <VSelect v-model="selectedOption" :options="options" />
          </div>
          <div class="page-toggle">
            <VToggle :theme="theme" @toggle-theme="toggleTheme" />
          </div>
          <div @click="logout" class="logout-button">Log out</div>
        </div>
        <div v-if="searchList.length === 0" class="no-results">
          <img
            src="../../public/img/Detective-check-footprint%201.png"
            alt=""
          />
          <div class="text-empty">Empty...</div>
        </div>
        <div v-else class="page-list">
          <transition-group name="fade">
            <div v-for="item in searchList" :key="item.id" class="item">
              <VCheckbox
                v-model="item.completed"
                @update:modelValue="toggleTaskStatus(item)"
              />

              <div class="item-content">
                <div class="item-input">
                  <div v-if="item.isEditing">
                    <VInput v-model="item.editTitle" class="item-title-input" />
                  </div>
                  <div
                    v-else
                    class="item-title"
                    :style="{
                      textDecoration: item.completed ? 'line-through' : 'none',
                    }"
                  >
                    {{ item.title }}
                  </div>
                </div>
                <div class="item-actions">
                  <div v-if="!item.isEditing" class="edit-delete-buttons">
                    <button @click="editTask(item)">
                      <img src="/img/edit.png" />
                    </button>
                    <button @click="deleteTask(item.id)">
                      <img src="/img/delete.png" alt="" />
                    </button>
                  </div>
                  <div v-else class="save-close-buttons">
                    <button @click="saveTask(item)">
                      <img src="/img/diskettee.png" alt="" />
                    </button>
                    <button @click="cancelEdit(item)">
                      <img src="/img/closee.png" alt="" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </transition-group>
        </div>
        <button class="add-task" @click="togglePopup">
          <img src="../../public/img/plus.png" alt="" />
        </button>
        <VPopup v-model:show="isPopupOpen" @apply="createNewTask" />
      </div>
    </div>
  </transition>
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

  &-container {
    position: relative;
    width: 750px;
    height: 100%;
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

  .no-results {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 30px 0;
    color: var(--text-color);

    img {
      margin-bottom: 20px;
    }

    .text {
      font-size: 20px;
      color: black;
    }
  }

  &-search {
    flex: 1;
  }

  &-select {
    flex: 0 0 93px;
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

  &-list {
    padding: 30px 115px;

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

      &-content {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .item-title-input {
        height: 30px;
      }

      .item-actions {
        display: flex;

        .edit-delete-buttons {
          display: none;
        }
      }

      &:hover .edit-delete-buttons {
        display: flex;
      }
    }
  }

  .add-task {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: $primary;
    color: white;
    border: none;
    font-size: 24px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s ease;

    img {
      object-position: center;
    }

    &:hover {
      background-color: darken($primary, 10%);
    }
  }
}
</style>
