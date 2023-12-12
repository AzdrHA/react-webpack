import { makeRequest } from '@app/api/makeRequest';
import { IActionTask, ITask, IUpdateTask } from '@app/models/ITask';

const API_URL = 'http://localhost:3000';

export const createTask = async (task: IActionTask) => {
  return await makeRequest<ITask>(`${API_URL}/create-task`, 'POST', task);
}

export const deleteTask = async (id: number) => {
  return await makeRequest<ITask>(`${API_URL}/delete-task/${id}`, 'DELETE');
}

export const readAllTask = async () => {
  return await makeRequest<ITask[]>(`${API_URL}/read-all-task`, 'GET');
}

export const readTask = async (id: number) => {
  return await makeRequest<ITask>(`${API_URL}/get-one-task/${id}`, 'GET');
}

export const updateTask = async (id: number, task: IUpdateTask) => {
  return await makeRequest<ITask>(`${API_URL}/update-task/${id}`, 'PATCH', task);
}

export const completeTask = async (id: number, status: boolean) => {
  return await makeRequest<ITask>(`${API_URL}/complete-task/${id}`, 'PATCH', { completed: status });
}