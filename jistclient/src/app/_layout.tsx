import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from "expo-router";
import { useEffect, useState } from 'react';
import NitroCookies from 'react-native-nitro-cookies';
import { Button } from 'react-native';

const queryClient = new QueryClient();

export default function RootLayout() {
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const [ userInfo, setUserInfo ] = useState<object | null>(null);

  const getUser = async () => {
    const user = await NitroCookies.get('https://192.168.0.100:5000');
    if(user){
      setUserInfo(user);
	  setIsLoggedIn(true);
	  console.log('userInfo: ' + userInfo);
	  console.log('isLoggedIn: ' + isLoggedIn);
    } else {
		setIsLoggedIn(false);
		console.log('userInfo: ' + userInfo);
		console.log('isLoggedIn: ' + isLoggedIn);
	}
  };
  
  useEffect(()=>{
    getUser();  
  },[]);
  
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