import { Text, View, StyleSheet } from 'react-native';
import LoginButton from '@/components/loginButton.jsx'
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter()
  const onLoginPress = () =>{
    router.navigate('/dashboard')
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome! Traveller</Text>
      <LoginButton title='Google' iconName="google-" onPress={onLoginPress}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 30,
  },
});
