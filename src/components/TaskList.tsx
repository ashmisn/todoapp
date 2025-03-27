import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Trash2, Cloud, CloudRain, Sun, CloudLightning } from 'lucide-react';
import { deleteTask } from '../store/slices/tasksSlice';
import type { RootState, Task } from '../types';

const TaskList: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.items);
  const dispatch = useDispatch();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getWeatherIcon = (description: string) => {
    if (description.includes('rain')) return <CloudRain className="w-5 h-5" />;
    if (description.includes('cloud')) return <Cloud className="w-5 h-5" />;
    if (description.includes('thunder')) return <CloudLightning className="w-5 h-5" />;
    return <Sun className="w-5 h-5" />;
  };

  return (
    <div className="space-y-4">
      {tasks.map((task: Task) => (
        <div
          key={task.id}
          className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 overflow-hidden"
        >
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
                <h3 className="text-xl font-semibold text-gray-800">{task.title}</h3>
              </div>
              <button
                onClick={() => dispatch(deleteTask(task.id))}
                className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors duration-200"
                aria-label="Delete task"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
            {task.weather && (
              <div className="mt-4 flex items-center gap-4 text-gray-600 bg-gray-50 p-3 rounded-lg">
                {getWeatherIcon(task.weather.description)}
                <span className="font-medium">{task.weather.temp}°C</span>
                <span className="text-sm capitalize">{task.weather.description}</span>
                <span className="text-sm text-gray-500">(Mumbai)</span>
              </div>
            )}
          </div>
        </div>
      ))}
      {tasks.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-lg">
          <p className="text-gray-500 text-lg">No tasks yet. Add your first task above!</p>
        </div>
      )}
    </div>
  );
};

export default TaskList;