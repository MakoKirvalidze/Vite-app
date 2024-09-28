import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './store';
import { addTask, toggleTask, removeTask, addTaskAsync } from './taskSlice';

const App: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch<AppDispatch>();
  const [taskTitle, setTaskTitle] = useState('');

  const handleAddTask = () => {
    dispatch(addTask(taskTitle));
    setTaskTitle('');
  };

  const handleAddTaskAsync = () => {
    dispatch(addTaskAsync(taskTitle));
    setTaskTitle('');
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <input
        type="text"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        placeholder="Enter task title"
      />
      <button onClick={handleAddTask}>Add Task</button>
      <button onClick={handleAddTaskAsync}>Add Task Later</button>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <span
              style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
              onClick={() => dispatch(toggleTask(task.id))}
            >
              {task.title}
            </span>
            <button onClick={() => dispatch(removeTask(task.id))}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
