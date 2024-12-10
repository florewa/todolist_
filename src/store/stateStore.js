import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useStateStore = defineStore('stateStore', () => {
  const isLoading = ref(false)
  const tasks = ref([])

  const readTasks = async () => {
    const API = window.API
    try {
      isLoading.value = true
      const response = await axios.get(`${API}/tasks/read.php`, {
        headers: {
          Accept: 'application/json',
        },
      })
      tasks.value = response.data
      console.log(tasks.value)
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error)
    } finally {
      isLoading.value = false
    }
  }

  const createTask = async (newTask) => {
    const API = window.API
    const userId = sessionStorage.getItem('user_id')

    if (!userId) {
      console.error('User not authenticated')
      return
    }

    try {
      const taskData = { ...newTask, user_id: userId }

      const response = await axios.post(`${API}/tasks/create.php`, taskData, {
        headers: { 'Content-Type': 'application/json' },
      })

      if (response.data.success) {
        console.log('Задача успешно создана:', response.data.message)
        await readTasks()
      } else {
        console.error('Ошибка при создании задачи:', response.data.message)
      }
    } catch (error) {
      console.error('Ошибка при создании задачи:', error)
    }
  }



  const deleteTask = async (id) => {
    const API = window.API
    try {
      const response = await axios({
        url: `${API}/tasks/delete.php`,
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify({ id }),
      })
      console.log(response.data.message)
      tasks.value = tasks.value.filter((task) => task.id !== id)
    } catch (error) {
      console.error('Ошибка при удалении задачи:', error)
    }
  }

  const updateTaskStatus = async (id, completed) => {
    const API = window.API
    try {
      const response = await axios.put(
        `${API}/tasks/update_status.php`,
        { id, completed },
        { headers: { 'Content-Type': 'application/json' } }
      )
      console.log('Ответ сервера:', response.data)

      const task = tasks.value.find((task) => task.id === id)
      if (task) {
        task.completed = completed
        console.log('Локальный статус обновлен:', task)
      }
    } catch (error) {
      console.error('Ошибка при обновлении статуса:', error)
    }
  }

  const editTask = async (id, newTitle) => {
    const API = window.API
    try {
      const response = await axios({
        url: `${API}/tasks/edit.php`,
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify({ id, title: newTitle }),
      })
      console.log(response.data.message)
      const task = tasks.value.find((task) => task.id === id)
      if (task) task.title = newTitle
    } catch (error) {
      console.log('Ошибка при редактировании задачи', error)
    }
  }

  return {
    isLoading,
    tasks,
    readTasks,
    createTask,
    deleteTask,
    updateTaskStatus,
    editTask,
  }
})
