import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from "expo-router";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="index" options={{ title: '', headerStyle:{backgroundColor:'#007bff'}, headerShadowVisible: false }}/>
        <Stack.Screen name="chatListView" options={{ title: 'Chats' }}/>
        <Stack.Screen name="chatInputView" />
      </Stack>
    </QueryClientProvider> 
  );
}