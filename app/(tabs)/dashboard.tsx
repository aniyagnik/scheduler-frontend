import { Text, View, StyleSheet } from 'react-native';
import CreateTaskButton from '@/components/createTaskButton'
import { useRouter } from 'expo-router';

export default function Dashboard() {
  const router = useRouter()
  const onCreateTaskPress = () => {
    router.navigate('/createTask')
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Dashboard</Text>
      <CreateTaskButton onPress={onCreateTaskPress}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
  },
});
