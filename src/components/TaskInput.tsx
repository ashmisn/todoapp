import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { PlusCircle } from 'lucide-react';
import { addTask, fetchWeather } from '../store/slices/tasksSlice';
import './TaskInput.css'; // Import CSS file

const TaskInput: React.FC = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = {
      id: Date.now().toString(),
      title: title.trim(),
      priority,
    };

    dispatch(addTask(newTask));
    dispatch(fetchWeather(newTask.id));
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="task-form-container">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          className="task-input"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as 'high' | 'medium' | 'low')}
          className="task-select"
        >
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>
        <button type="submit" className="task-button">
          <PlusCircle className="w-5 h-5" />
          <span>Add Task</span>
        </button>
      </div>
    </form>
  );
};

export default TaskInput;
