import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import LoginButton from '@/components/loginButton.jsx'
import { useRouter } from 'expo-router';
import { Entypo } from '@expo/vector-icons';

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
      <TouchableOpacity
        activeOpacity={0.7}
				style={styles.skipButton}
        onPress={onLoginPress}
			>
      	<Text style={styles.buttonText}>skip</Text>
        <Entypo 
            style={styles.icon} 
            name="chevron-right" 
            size={15} 
            color="white"
          />
			</TouchableOpacity>
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
  skipButton: {
    justifyContent:'space-evenly',
    alignItems:'center',
    flexDirection:'row',
    paddingHorizontal:20,
    paddingVertical:5,
    borderRadius:5,
    borderColor:'black',
    backgroundColor:'darkblue',
    margin:10
	},
  icon:{
    justifyContent:'center',
    display:'flex'
  },
  buttonText:{
    display: 'flex',
    alignSelf: 'center',
    fontWeight:'bold',
    fontSize: 15,
    color: 'white',
  }
});