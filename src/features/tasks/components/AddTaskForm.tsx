import { memo } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type AddTaskFormProps = {
  value: string;
  onChangeText: (value: string) => void;
  onSubmit: () => void;
};

function AddTaskFormComponent({
  value,
  onChangeText,
  onSubmit,
}: AddTaskFormProps) {
  return (
    <View style={styles.container}>
      <TextInput
        accessibilityLabel="Nome da nova tarefa"
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        placeholder="O que você precisa fazer?"
        placeholderTextColor="#9299A8"
        returnKeyType="done"
        style={styles.input}
        value={value}
      />
      <Pressable
        accessibilityLabel="Adicionar tarefa"
        accessibilityRole="button"
        onPress={onSubmit}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={styles.buttonText}>Adicionar tarefa</Text>
      </Pressable>
    </View>
  );
}

export const AddTaskForm = memo(AddTaskFormComponent);

const styles = StyleSheet.create({
  container: {
    gap: 12,
    marginBottom: 32,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E8EAF0',
    borderRadius: 16,
    borderWidth: 1,
    color: '#20283A',
    fontSize: 16,
    minHeight: 56,
    paddingHorizontal: 18,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#5267E8',
    borderRadius: 16,
    justifyContent: 'center',
    minHeight: 54,
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
