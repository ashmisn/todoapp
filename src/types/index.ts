export interface Task {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  weather?: {
    temp: number;
    description: string;
    icon: string;
  };
}

export interface User {
  username: string;
  isAuthenticated: boolean;
}

export interface RootState {
  tasks: {
    items: Task[];
  };
  auth: User;
}