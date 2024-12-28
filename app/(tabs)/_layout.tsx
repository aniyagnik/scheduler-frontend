import { Tabs } from 'expo-router';

import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { View } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'brown',
        headerStyle: {
          backgroundColor: 'whitesmoke',
        },
        headerShadowVisible: false,
        headerTintColor: 'gray',
        tabBarStyle: {
        backgroundColor: 'whitesmoke',
        },
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
            <View style={{borderWidth:3,borderColor:'whitesmoke',justifyContent:'center',alignItems:'center', marginBottom:40,height:50,width:50,backgroundColor:'gold',borderRadius:50}}>            
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
