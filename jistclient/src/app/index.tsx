//import { globalStyles } from '@/styles/global';
import { Link } from 'expo-router';
import { KeyboardAvoidingView, Text, View } from 'react-native';
//import HomeHeader from '../components/HomeHeader';

export default function HomeScreen() {
  return (
    <KeyboardAvoidingView>

      <Text style={{ marginTop: '60%', textAlign: 'center', textAlignVertical: 'center', 
                     fontSize: 60, fontWeight: 900, color: '#007bff' }}>
        JIST
      </Text>

      <Link href='/chatView' style={{ textAlign: 'center', textAlignVertical: 'center', fontSize: 18, color: '#007bff', marginTop: 30, paddingLeft: 15 }}>
        Chat View
      </Link>

    </KeyboardAvoidingView>
  );
}