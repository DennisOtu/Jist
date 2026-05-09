//import { globalStyles } from '@/styles/global';
import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function HomeScreen() {
  return (
      <View style={{ flex: 1, backgroundColor: '#007bff', justifyContent: 'center' }}>
        <Text style={{ textAlign: 'center', fontSize: 60, fontWeight: 900, color:  'white'}}>
          JIST
        </Text>
        <Link href='/chatListView' style={{ textAlign: 'center', fontSize: 18, color:  'white', marginTop: 30, paddingLeft: 15 }}>
          Chats
        </Link>
      </View>
  );
}