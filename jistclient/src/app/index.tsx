import { Link } from 'expo-router';
import { useState } from 'react';
import { Text, TextInput, View, StyleSheet, KeyboardAvoidingView } from 'react-native';

export default function HomeScreen() {
  const [ userName, setUserName] = useState('');
  const [ userNum, setUserNum] = useState('');

  const handleSignUp = async () => {
    console.log(`User Name: ${userName}`);
    console.log(`User Number: ${userNum}`);

    try {
      const res = await fetch('http://192.168.0.100:5000/api/v1/auth/signup', {
        method:  'POST',
				headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name : userName,
          phone : userNum,
        }),
        //credentials: 'include'
      })
      
      const data = res;
    
      if (data) {
        console.log(data);
      }
    } catch (error) {
        console.log('Error: ' + error);
    }
    setUserName('');
    setUserNum('');
  }

  const handleLogIn = async () => {
    console.log(`User Name: ${userName}`);
    console.log(`User Number: ${userNum}`);

    try {
      const res = await fetch('http://192.168.0.100:5000/api/v1/auth/login', {
        method:  'POST',
				headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name : userName,
          phone : userNum,
        }),
        //credentials: 'include'
      })
      
      const data = res;
    
      if (data) {
        console.log(data);
      }
    } catch (error) {
        console.log('Error: ' + error);
    }
    setUserName('');
    setUserNum('');
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#007bff', justifyContent: 'center' }}>
      <Text style={{ textAlign: 'center', fontSize: 60, fontWeight: 900, color:  'white'}}>
        JIST
      </Text>
      <TextInput style={styles.usrAuthInpt} value={userName} onChangeText={(text)=>{setUserName(text)}} placeholder='Name'/>
      <TextInput style={styles.usrAuthInpt} value={userNum} onChangeText={(text)=>{setUserNum(text)}} placeholder='Number'/>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Link href='/chatListView' style={styles.usrAuthLink} onPress={handleSignUp}>
          Sign Up
        </Link>

        <Link href='/chatListView' style={styles.usrAuthLink} onPress={handleLogIn}>
          Log In
        </Link>
      </View>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create ({
  usrAuthInpt: {
    width: '80%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginBlock: 10,
    backgroundColor: '#fff',
  },
  usrAuthLink: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color:  'white',
    marginTop: 20,
    marginInline: 20,
  }
});