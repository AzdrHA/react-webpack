import React, { useState, type KeyboardEvent, type FC, useEffect } from 'react';
import TaskList from '@app/components /TaskList';
import { IActionTask, ITask } from '@app/models/ITask';
import { createTask, readAllTask } from '@app/api/apiRequest';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, initializeTasks, removeTask } from '@app/store/task';

const App: FC = () => {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();

  const handleSaveInput = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && inputValue !== '') {
      const currentValue = (e.target as HTMLInputElement).value;
      const newTask: IActionTask = { description: 'description', title: currentValue };
      createTask(newTask).then((task) => {
        dispatch(addTask(task));
        setInputValue('');
      });
    }
  };

  useEffect(() => {
    readAllTask().then((tasks) => {
      console.log(tasks);
      dispatch(initializeTasks(tasks));
    });
  }, []);

  return (
    <div className="container">
      <div className="container__content">
        <header className="container__contentHeader">
          <h1>todos</h1>
        </header>
        <section className="container__contentBody">
          <div className="container__inputLine">
            <input
              type="text"
              value={inputValue}
              placeholder="What needs to be done?"
              data-testid="main-input"
              onChange={e => {
                setInputValue(e.target.value);
              }}
              onKeyDown={e => {
                handleSaveInput(e);
              }}
            />
          </div>
          <div className="container__list">
            <TaskList />
          </div>
        </section>
        {/*  <footer className="container__contentFooter">
          <span>{`${activeTasksLeft.length} ${activeTasksLeft.length === 1 ? 'item' : 'items'} left`}</span>
          <div
            className="container__listFilters"
          >
            <button className="container__filterButton container__filterButton_active" data-testid="display-all">
              All
            </button>
            <button className="container__filterButton" data-testid="active-todos">
              Active
            </button>
            <button className="container__filterButton">Completed</button>
          </div>
          <button
            // onClick={handleClearCompletedTasks}
            data-testid="clear-all">
            Clear completed
          </button>
        </footer>
        <div className="container__backPage container__backPage_first"></div>
        <div className="container__backPage container__backPage_second"></div>*/}
      </div>
    </div>
  );
};

export default App;