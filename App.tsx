import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import { TasksScreen } from './src/features/tasks/screens/TasksScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <TasksScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
