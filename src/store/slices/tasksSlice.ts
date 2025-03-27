import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Task } from '../../types';

const WEATHER_API_KEY = 'b1b15e88fa797225412429c1c50c122a1'; // Demo API key

export const fetchWeather = createAsyncThunk(
  'tasks/fetchWeather',
  async (taskId: string) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Mumbai&appid=${WEATHER_API_KEY}&units=metric`
    );
    const data = await response.json();
    return { taskId, weather: {
      temp: data.main.temp,
      description: data.weather[0].description,
      icon: data.weather[0].icon
    }};
  }
);

interface TasksState {
  items: Task[];
}

const initialState: TasksState = {
  items: []
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.items.push(action.payload);
    },
    deleteTask: (state, action) => {
      state.items = state.items.filter(task => task.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWeather.fulfilled, (state, action) => {
      const task = state.items.find(t => t.id === action.payload.taskId);
      if (task) {
        task.weather = action.payload.weather;
      }
    });
  },
});

export const { addTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;