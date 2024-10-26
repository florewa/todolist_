<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import VInput from '@/components/VInput.vue'
import VCheckbox from '@/components/VCheckbox.vue'
import VSelect from '@/components/VSelect.vue'
import VPopup from '@/components/VPopup.vue'
import VToggle from '@/components/VToggle.vue'

const loadTasksFromLocalStorage = () => {
  const tasks = localStorage.getItem('tasks')
  return tasks ? JSON.parse(tasks) : []
}
const list = ref([])
onMounted(() => {
  list.value = loadTasksFromLocalStorage()
})

const saveTasksToLocalStorage = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}
watch(
  list,
  (newList) => {
    saveTasksToLocalStorage(newList)
  },
  { deep: true }
)

const options = ref(['All', 'Checked', 'Unchecked'])
const selectedOption = ref('ALL')
const value = ref('')

const filteredList = computed(() => {
  if (selectedOption.value === 'Checked') {
    return list.value.filter((task) => task.checked)
  } else if (selectedOption.value === 'Unchecked') {
    return list.value.filter((task) => !task.checked)
  }
  return list.value
})

const searchList = computed(() => {
  if (!value.value) return filteredList.value
  return filteredList.value.filter((task) =>
    task.title.toLowerCase().includes(value.value.toLowerCase())
  )
})

const applyChanges = (newTaskTitle) => {
  if (newTaskTitle) {
    const newTask = {
      id: list.value.length + 1,
      title: newTaskTitle,
      checked: false,
    }
    list.value.push(newTask)
  }
}

const editTask = (task) => {
  task.isEditing = true
  task.editTitle = task.title
}

const saveTask = (task) => {
  task.title = task.editTitle
  task.isEditing = false
}

const cancelEdit = (task) => {
  task.isEditing = false
  task.editTitle = ''
}

const deleteTask = (task) => {
  list.value = list.value.filter((t) => t.id !== task.id)
}

const isPopupOpen = ref(false)

const togglePopup = () => {
  isPopupOpen.value = !isPopupOpen.value
}
const theme = ref(localStorage.getItem('theme') || 'light')

const toggleTheme = (newTheme) => {
  theme.value = newTheme
  localStorage.setItem('theme', newTheme)

  document.querySelector('.page').className = `page ${newTheme}`
}

onMounted(() => {
  document.querySelector('.page').className = `page ${theme.value}`
})
</script>

<template>
  <transition name="fade">
    <div class="page" :class="theme">
      <div class="page-container">
        <div class="page-title">TODO LIST</div>
        <div class="page-menu">
          <div class="page-search">
            <VInput v-model="value" placeholder="Search note..." />
          </div>
          <div class="page-select">
            <VSelect v-model="selectedOption" :options="options" />
          </div>
          <div class="page-toggle">
            <VToggle :theme="theme" @toggle-theme="toggleTheme" />
          </div>
        </div>
        <div v-if="searchList.length === 0" class="no-results">
          <img src="src/assets/img/Detective-check-footprint%201.png" alt="" />
          <div class="text">Empty...</div>
        </div>
        <div v-else class="page-list">
          <transition-group name="fade">
            <div v-for="item in searchList" :key="item.id" class="item">
              <VCheckbox v-model="item.checked" />
              <div class="item-content">
                <div class="item-input">
                  <div v-if="item.isEditing">
                    <input v-model="item.editTitle" class="item-title-input" />
                  </div>
                  <div
                    v-else
                    class="item-title"
                    :style="{
                      textDecoration: item.checked ? 'line-through' : 'none',
                    }"
                  >
                    {{ item.title }}
                  </div>
                </div>
                <div class="item-actions">
                  <div v-if="!item.isEditing" class="edit-delete-buttons">
                    <button @click="editTask(item)">
                      <img src="src/assets/img/edit.png" />
                    </button>
                    <button @click="deleteTask(item)">
                      <img src="src/assets/img/delete.png" alt="" />
                    </button>
                  </div>
                  <div v-else class="save-close-buttons">
                    <button @click="saveTask(item)">
                      <img src="src/assets/img/diskettee.png" alt="" />
                    </button>
                    <button @click="cancelEdit(item)">
                      <img src="src/assets/img/closee.png" alt="" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </transition-group>
        </div>

        <button class="add-task" @click="togglePopup">+</button>
        <VPopup
          :show="isPopupOpen"
          @update:show="togglePopup"
          @apply="applyChanges"
        />
      </div>
    </div>
  </transition>
</template>
<style scoped lang="scss">
@import '@/assets/scss/variables';

.page {
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 40px 0;

  &.dark {
    background-color: #252525;
    color: white;
  }

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
    flex: 0 0 150px;
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
      }

      .item-title-input {
      }

      .item-actions {
        display: flex;
        gap: 8px;

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

    &:hover {
      background-color: darken($primary, 10%);
    }
  }
}
</style>
