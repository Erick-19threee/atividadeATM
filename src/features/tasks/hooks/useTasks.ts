import { useReducer } from 'react';

import { taskReducer } from './taskReducer';

export function useTasks() {
  return useReducer(taskReducer, []);
}
