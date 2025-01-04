import { Tabs } from 'expo-router';

import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { View,StyleSheet } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'brown',
        headerStyle: {
          backgroundColor: 'whitesmoke',
        },
        tabBarLabelPosition:'below-icon',
        headerTintColor: 'gray',
        tabBarStyle: {
        backgroundColor: 'whitesmoke',
        },
        headerRight:(props:any)=><FontAwesome6 style={{marginRight:10}} {...props} name="user-tie" size={28} color="black" />
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons name={focused ? 'view-dashboard' : 'view-dashboard-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="createTask"
        options={{
          title: 'Task',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.taskIcon}>            
              <Ionicons name={focused ? 'add-circle' : 'add-circle-outline'} color={color} size={24}/>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={24}/>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  taskIcon:{
    borderWidth:8,
    borderColor:'white',
    justifyContent:'center',
    alignItems:'center', 
    marginBottom:50,
    height:60,
    width:60,
    backgroundColor:'crimson',
    borderRadius:60
  }
})