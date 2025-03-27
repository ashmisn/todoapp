import React from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { LogOut } from 'lucide-react';
import { store, persistor } from './store';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import Auth from './components/Auth';
import { logout } from './store/slices/authSlice';
import type { RootState } from './types';

const TodoApp: React.FC = () => {
  const { isAuthenticated, username } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  if (!isAuthenticated) {
    return <Auth />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8 flex justify-between items-center bg-white p-6 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Welcome, {username}!</span>
            <button
              onClick={() => dispatch(logout())}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
        <div className="space-y-8">
          <TaskInput />
          <TaskList />
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <TodoApp />
      </PersistGate>
    </Provider>
  );
}

export default App;