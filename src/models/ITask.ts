export interface IActionTask {
  title: string;
  description: string;
}

export interface IUpdateTask extends IActionTask {
  completed: boolean;
}

export interface ITask extends IUpdateTask {
  id: number
  dueDate: Date;
}