import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './task';

export default configureStore({
  reducer: {
    task: taskReducer,
  },
})