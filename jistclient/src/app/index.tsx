import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, TextInput, View, StyleSheet, KeyboardAvoidingView, Pressable } from 'react-native';

export default function HomeScreen() {
  const srvIP = '192.168.0.101'
  const [ nameInput, setNameInput] = useState('');
  const [ numInput, setNumInput] = useState('');
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      const res = await fetch(`http://${srvIP}:5000/api/v1/auth/signup`, {
        method:  'POST',
				headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name : nameInput,
          phone : numInput,
        }),
        credentials: 'include'
      }).then(response=> response.json()).then(data=>{return data})

      if (res) {
        console.log(`User Sign In: ${res.user.name}`);     
        router.push({
          pathname: "/chatListView",
          params: { userId: res.user._id }
        })   
      }
    } catch (error) {
        console.log('Error: ' + error);
    }
    setNameInput('');
    setNumInput('');
  }

  const handleLogIn = async () => {
    try {
      const res = await fetch(`http://${srvIP}:5000/api/v1/auth/login`, {
        method:  'POST',
				headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name : nameInput,
          phone : numInput,
        }),
        credentials: 'include'
      }).then(response=> response.json()).then(data=>{return data})

      if (res) {
        console.log(`User Sign In: ${res.user.name}`);
        router.push({
          pathname: "/chatListView",
          params: { userId: res.user._id }
        })            
      }
    } catch (error) {
        console.log('Error: ' + error);
    }
    setNameInput('');
    setNumInput('');
  }

  const handleLogOut = () => {
    setNameInput('');
    setNumInput('');
	  console.log('User Sign Out');
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#007bff', justifyContent: 'center' }}>
      <Text style={{ textAlign: 'center', fontSize: 60, fontWeight: 900, color:  'white'}}>
        JIST
      </Text>
      <TextInput style={styles.usrAuthInpt} value={nameInput} onChangeText={(text)=>{setNameInput(text)}} placeholder='Name'/>
      <TextInput style={styles.usrAuthInpt} value={numInput} onChangeText={(text)=>{setNumInput(text)}} placeholder='Number'/>

      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

        <Pressable onPress={handleLogIn}>
          <Text style={styles.usrAuthLink}>Sign In</Text>
        </Pressable>
        
        <Text style={{ fontSize: 18, fontStyle: 'italic', color: 'white', marginTop: 20, textAlign: 'center', marginInline: 20 }}>New to Jist?</Text>
        
        <Pressable onPress={handleSignUp}>
          <Text style={styles.usrAuthLink}>Sign Up</Text>
        </Pressable>
                
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Pressable onPress={handleLogOut}>
            <Text style={styles.usrAuthLink}>Sign Out</Text>
          </Pressable>        
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
    color:  '#fff',
    marginTop: 20,
    marginInline: 20,
  }
});