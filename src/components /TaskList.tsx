import React, { type FC, useEffect } from 'react';
import SingleTask from './SingleTask';
import { useSelector } from 'react-redux';
import { completeTasks, incompleteTasks, selectTasks } from '@app/store/task';

const TaskList: FC = () => {
  const tasksSelector = useSelector(selectTasks);

  return (
    <div>
      {
        tasksSelector.map(task => (
          <SingleTask task={task} key={task.id} />
        ))
      }
    </div>
  );
};

export default TaskList;