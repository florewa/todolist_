<script setup>
import { computed } from 'vue'
import VCheckbox from '@/components/VCheckbox.vue'
import { useStateStore } from '@/store/stateStore'

const props = defineProps({
  tasks: {
    type: Array,
    required: true,
  },
  selectedOption: {
    type: String,
    required: true,
  },
  getTaskStyle: {
    type: Function,
    required: true
  }
})

const store = useStateStore()
const emit = defineEmits(['toggleStatus', 'deleteTask', 'editTask'])

const toggleTaskStatus = async (task) => {
  try {
    const newStatus = task.completed === 1 ? 0 : 1
    await store.updateTaskStatus(task.id, newStatus)
    await store.readTasks()
  } catch (error) {
    console.error('Ошибка при обновлении статуса задачи:', error)
  }
}
</script>

<template>
  <div v-if="tasks.length === 0" class="no-results">
    <img src="/img/Detective-check-footprint%201.png" alt="" />
    <div class="text-empty">Empty...</div>
  </div>
  <div v-else class="page-list">
    <transition-group name="fade">
      <div
        v-for="task in tasks"
        :key="task.id"
        :class="['item', props.getTaskStyle(task)]"
      >
        <VCheckbox
          :model-value="task.completed === 1"
          @update:model-value="toggleTaskStatus(task)"
        />
        <div class="item-content" @click="emit('editTask', task)">
          <div class="item-input">
            <div
              class="item-title"
              :style="{
                textDecoration: task.completed ? 'line-through' : 'none',
              }"
            >
              {{ task.title }}
            </div>
          </div>
          <div class="item-actions">
            <div class="delete-button">
              <button @click.stop="emit('deleteTask', task.id)">
                <img src="/img/delete.png" alt="Удалить" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/variables';

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

  .text-empty {
    font-size: 20px;
    color: var(--text-color);
  }
}

.page-list {
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

      button {
        background: none;
        border: none;
        cursor: pointer;
        padding: 5px;

        &:hover {
          opacity: 0.8;
        }
      }
    }

    &:hover .edit-delete-buttons {
      display: flex;
    }
  }

  .item.task-red {
    background-color: $red;
  }

  .item.task-yellow {
    background-color: $yellow;
  }
}
</style>
