import { createSlice } from '@reduxjs/toolkit'

export const taskSlicer = createSlice({
  name: 'task',
  initialState: {
    tasks: [],
  },
  reducers: {
    initializeTasks: (state, action) => {
      state.tasks = action.payload
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload)
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload)
    },
    changeTaskStatus: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload.id)
      task.completed = action.payload.completed
    }
  },
})

export const { initializeTasks, addTask, removeTask, changeTaskStatus } = taskSlicer.actions

export const selectTasks = (state) => state.task.tasks
export const completeTasks = (state) => state.task.tasks.filter(task => task.completed)
export const incompleteTasks = (state) => state.task.tasks.filter(task => !task.completed)

export default taskSlicer.reducer