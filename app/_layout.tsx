import { Stack } from "expo-router";
import { UserProvider } from "@/app/context/userContext";

export default function RootLayout() {
  return (
    <UserProvider>
      <Stack screenOptions={{
        contentStyle:{backgroundColor:'white'}
      }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="dashboard" />
        <Stack.Screen name="calendar" />
        <Stack.Screen name="createTask" />
        <Stack.Screen name="statistics" />
        <Stack.Screen name="+not-found" />
      </Stack>
    </UserProvider>
  );
}
