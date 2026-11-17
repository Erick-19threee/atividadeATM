import { memo } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { TaskItem } from './TaskItem';
import type { Task } from '../types/task';

type TaskListProps = {
  tasks: Task[];
  onToggle: (id: Task['id']) => void;
};

function EmptyTaskList() {
  return (
    <View style={styles.empty}>
      <Text style={styles.emptyTitle}>Tudo começa com uma tarefa</Text>
      <Text style={styles.emptyDescription}>
        Adicione sua primeira tarefa usando o campo acima.
      </Text>
    </View>
  );
}

function TaskListComponent({ tasks, onToggle }: TaskListProps) {
  return (
    <FlatList
      contentContainerStyle={styles.content}
      data={tasks}
      ItemSeparatorComponent={TaskSeparator}
      keyExtractor={(task) => task.id}
      keyboardShouldPersistTaps="handled"
      ListEmptyComponent={EmptyTaskList}
      renderItem={({ item }) => <TaskItem onToggle={onToggle} task={item} />}
      showsVerticalScrollIndicator={false}
    />
  );
}

function TaskSeparator() {
  return <View style={styles.separator} />;
}

export const TaskList = memo(TaskListComponent);

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    paddingBottom: 32,
  },
  separator: {
    height: 10,
  },
  empty: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  emptyTitle: {
    color: '#293247',
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyDescription: {
    color: '#7D8596',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
  },
});
