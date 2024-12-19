import { Text, View, Image, StyleSheet } from 'react-native';
import LoginButton from '@/components/loginButton.jsx'
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter()
  const onLoginPress = () =>{
    router.navigate('/dashboard')
  }
  return (
    <View style={styles.container}>
      <Image 
        source={require('@/assets/images/waterO.gif')}
        style={{
            width:"100%",
            height:"50%",
        }}
        resizeMode='cover'  
      />  
      <Text style={styles.text}>Welcome! Traveller</Text>
      <LoginButton title='Google' iconName="google-" onPress={onLoginPress}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'black',
    fontSize: 30,
  },
});