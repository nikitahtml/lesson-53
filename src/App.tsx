import React, { useState } from 'react';
import './App.css'


const AddTaskForm = ({ onAdd }) => {
  const [currentTask, setCurrentTask] = useState('');

  const handleChange = (e) => {
    setCurrentTask(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!currentTask.trim()) return;
    onAdd(currentTask);
    setCurrentTask('');
  };

  return (
      <form onSubmit={handleSubmit}>
        <input
            type="text"
            value={currentTask}
            onChange={handleChange}
            placeholder="Введите задачу..."
        />
        <button type="submit">Добавить</button>
      </form>
  );
};

const Task = ({ task, onDelete }) => {
  return (
      <div>
        <span>{task.text}</span>
        <button onClick={() => onDelete(task.id)}>Удалить</button>
      </div>
  );
};

const App = () => {
  const [tasks, setTasks] = useState([
    { id: '1', text: 'Сходить в кинотеатр' },
    { id: '2', text: 'Помыть машину' },
    { id: '3', text: 'Записаться на курсы' },
  ]);

  const handleAddTask = (text) => {
    const newTask = {
      id: String(Math.random()),
      text,
    };
    setTasks([...tasks, newTask]);
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
      <div>
        <h1>ToDo List</h1>
        <AddTaskForm onAdd={handleAddTask} />
        <div>
          {tasks.map(task => (
              <Task key={task.id} task={task} onDelete={handleDeleteTask} />
          ))}
        </div>
      </div>
  );
};

export default App;
