import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack>
            <Stack.Screen name="index" options={{ title: '', headerStyle:{backgroundColor:'#007bff'}, headerShadowVisible: false }}/>
            <Stack.Screen name="chatListView" options={{ title: 'Chats' }}/>
            <Stack.Screen name="chatInputView" />
          </Stack>
}
