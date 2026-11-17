import { useCallback, useMemo, useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { AddTaskForm } from '../components/AddTaskForm';
import { TaskList } from '../components/TaskList';
import { useTasks } from '../hooks/useTasks';
import type { Task } from '../types/task';

export function TasksScreen() {
  const [tasks, dispatch] = useTasks();
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const nextTaskId = useRef(0);

  const pendingCount = useMemo(
    () => tasks.reduce((count, task) => count + Number(!task.completed), 0),
    [tasks],
  );

  const handleAddTask = useCallback(() => {
    const title = newTaskTitle.trim();

    if (!title) {
      return;
    }

    const task: Task = {
      id: `task-${nextTaskId.current++}`,
      title,
      completed: false,
    };

    dispatch({ type: 'task/added', task });
    setNewTaskTitle('');
  }, [dispatch, newTaskTitle]);

  const handleToggleTask = useCallback((id: Task['id']) => {
    dispatch({ type: 'task/toggled', id });
  }, [dispatch]);

  const handleChangeTitle = useCallback((value: string) => {
    setNewTaskTitle(value);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>ORGANIZAÇÃO PESSOAL</Text>
          <Text style={styles.heading}>Minhas tarefas</Text>
          <Text style={styles.subtitle}>
            Um passo de cada vez, no seu ritmo.
          </Text>
        </View>

        <AddTaskForm
          onChangeText={handleChangeTitle}
          onSubmit={handleAddTask}
          value={newTaskTitle}
        />

        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>Sua lista</Text>
          <Text style={styles.pendingCount}>
            {pendingCount} {pendingCount === 1 ? 'pendente' : 'pendentes'}
          </Text>
        </View>

        <TaskList onToggle={handleToggleTask} tasks={tasks} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#F5F6FA',
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  header: {
    marginBottom: 28,
  },
  eyebrow: {
    color: '#5267E8',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  heading: {
    color: '#20283A',
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -0.8,
    marginBottom: 8,
  },
  subtitle: {
    color: '#7D8596',
    fontSize: 15,
    lineHeight: 22,
  },
  listHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  listTitle: {
    color: '#293247',
    fontSize: 18,
    fontWeight: '700',
  },
  pendingCount: {
    color: '#7D8596',
    fontSize: 14,
  },
});
