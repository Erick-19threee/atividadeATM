import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Task } from '../types/task';

type TaskItemProps = {
  task: Task;
  onToggle: (id: Task['id']) => void;
};

function TaskItemComponent({ task, onToggle }: TaskItemProps) {
  return (
    <Pressable
      accessibilityLabel={`${task.title}, ${task.completed ? 'concluída' : 'pendente'}`}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: task.completed }}
      onPress={() => onToggle(task.id)}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
      ]}
    >
      <View style={[styles.checkbox, task.completed && styles.checkboxDone]}>
        {task.completed && <Text style={styles.checkmark}>✓</Text>}
      </View>
      <Text
        style={[styles.title, task.completed && styles.titleCompleted]}
      >
        {task.title}
      </Text>
    </Pressable>
  );
}

export const TaskItem = memo(TaskItemComponent);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    flexDirection: 'row',
    gap: 14,
    minHeight: 68,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  pressed: {
    opacity: 0.75,
  },
  checkbox: {
    alignItems: 'center',
    borderColor: '#D5D9E3',
    borderRadius: 12,
    borderWidth: 2,
    height: 24,
    justifyContent: 'center',
    width: 24,
  },
  checkboxDone: {
    backgroundColor: '#5267E8',
    borderColor: '#5267E8',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 18,
  },
  title: {
    color: '#293247',
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
  },
  titleCompleted: {
    color: '#9299A8',
    textDecorationLine: 'line-through',
  },
});
