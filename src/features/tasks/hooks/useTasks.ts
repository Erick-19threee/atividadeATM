import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useReducer, useState } from 'react';

import { taskReducer } from './taskReducer';
import initialTasks from '../../../../data/tasks.json';

const TASKS_STORAGE_KEY = '@atividadeatm/tasks';

export function useTasks() {
  const [tasks, dispatch] = useReducer(taskReducer, []);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    async function loadTasks() {
      try {
        const storedTasks = await AsyncStorage.getItem(TASKS_STORAGE_KEY);

        if (storedTasks) {
          const parsedTasks = JSON.parse(storedTasks);
          dispatch({
            type: 'tasks/loaded',
            tasks: Array.isArray(parsedTasks) ? parsedTasks : initialTasks,
          });
        } else {
          dispatch({ type: 'tasks/loaded', tasks: initialTasks });
        }
      } catch {
        dispatch({ type: 'tasks/loaded', tasks: initialTasks });
      } finally {
        setHydrated(true);
      }
    }

    loadTasks();
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks)).catch((error) => {
      console.error('Não foi possível salvar as tarefas:', error);
    });
  }, [hydrated, tasks]);

  return [tasks, dispatch] as const;
}
