//import { globalStyles } from '@/styles/global';
import { Link } from 'expo-router';
import { KeyboardAvoidingView, Text, View } from 'react-native';
//import HomeHeader from '../components/HomeHeader';

export default function HomeScreen() {
  return (
    <KeyboardAvoidingView>
      <Link href='/chatView' style={{ fontSize: 18, color: '#007bff', marginTop: 20, paddingLeft: 15 }}>
        Chat View
      </Link>
      <Text style={{ paddingTop: '60%', textAlign: 'center', textAlignVertical: 'center', fontSize: 60, fontWeight: 900, color: '#007bff' }}>JIST</Text>
    </KeyboardAvoidingView>
  );
}