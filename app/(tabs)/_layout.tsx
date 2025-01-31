import { Tabs } from "expo-router";

import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { View, StyleSheet } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "brown",
        headerStyle: {
          backgroundColor: "whitesmoke",
        },
        tabBarLabelPosition: "below-icon",
        headerTintColor: "gray",
        tabBarStyle: {
          borderTopColor: "whitesmoke",
          backgroundColor: "whitesmoke",
        },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "view-dashboard" : "view-dashboard-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="createTask"
        options={{
          title: "Task",
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.outerTaskIcon}>
              <View style={styles.taskIcon}>
                <Ionicons
                  name={focused ? "add-circle" : "add-circle-outline"}
                  color={color}
                  size={24}
                />
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: "Calendar",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "calendar-sharp" : "calendar-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  outerTaskIcon: {
    marginBottom: 50,
    justifyContent: "center",
    alignItems: "center",
    height: 70,
    width: 70,
    backgroundColor: "white",
    borderRadius: 80,
  },
  taskIcon: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 50,
    color: "white",
    backgroundColor: "crimson",
    borderRadius: 50,
    boxShadow:
      "-2px -2px 8px crimson, 2px 2px 8px red, inset 2px 2px 10px crimson, inset -2px -2px 10px red",
  },
  taskIcon_hover: {
    boxShadow:
      "-2px -2px 8px crimson, 2px 2px 8px red, inset 2px 2px 10px red, inset -2px -2px 10px crimson",
    transitionDuration: "500ms",
    color: "#93f071",
  },
});
