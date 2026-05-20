import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, TextInput, View, StyleSheet, KeyboardAvoidingView, Pressable } from 'react-native';
import NitroCookies from 'react-native-nitro-cookies'


export default function HomeScreen() {
  const [ userName, setUserName] = useState('');
  const [ userNum, setUserNum] = useState('');

  const handleSignUp = async () => {
    console.log(`Name Input: ${userName}`);
    console.log(`Number Input: ${userNum}`);

    try {
      const res = await fetch('http://192.168.0.100:5000/api/v1/auth/signup', {
        method:  'POST',
				headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name : userName,
          phone : userNum,
        }),
        credentials: 'include'
      })
      if (res) {
        const cookies = await NitroCookies.get('https://192.168.0.100:5000');
        await NitroCookies.set('https://192.168.0.100:5000', {
          name: "authToken",
          value: cookies.jwt.value,
          path: "/",
          secure: true,		  
        });      
        console.log(JSON.stringify(cookies.jwt.value, null, 2));
      }
    } catch (error) {
        console.log('Error: ' + error);
    }
    setUserName('');
    setUserNum('');
  }

  const handleLogIn = async () => {
    console.log(`Name Input: ${userName}`);
    console.log(`Number Input: ${userNum}`);

    try {
      const res = await fetch('http://192.168.0.100:5000/api/v1/auth/login', {
        method:  'POST',
				headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name : userName,
          phone : userNum,
        }),
        credentials: 'include'
      })
      if (res) {
        const cookies = await NitroCookies.get('https://192.168.0.100:5000');
        await NitroCookies.set('https://192.168.0.100:5000', {
          name: "authToken",
          value: JSON.stringify(cookies.jwt.value, null, 2),
          path: "/",
          secure: true,		  
        });      
        //console.log(JSON.stringify(cookies.jwt.value, null, 2));
      }
    } catch (error) {
        console.log('Error: ' + error);
    }
    setUserName('');
    setUserNum('');
  }

  const handleLogOut = async () => {
    await NitroCookies.clearAll();
    setUserName('');
    setUserNum('');
	  console.log('User SignOut Successfull');
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#007bff', justifyContent: 'center' }}>
      <Text style={{ textAlign: 'center', fontSize: 60, fontWeight: 900, color:  'white'}}>
        JIST
      </Text>
      <TextInput style={styles.usrAuthInpt} value={userName} onChangeText={(text)=>{setUserName(text)}} placeholder='Name'/>
      <TextInput style={styles.usrAuthInpt} value={userNum} onChangeText={(text)=>{setUserNum(text)}} placeholder='Number'/>

      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

        <Link href={'/chatListView'} asChild>
          <Pressable onPress={handleLogIn}>
            <Text style={styles.usrAuthLink}>Sign In</Text>
          </Pressable>
        </Link>

        <Text style={{ fontSize: 18, fontStyle: 'italic', color: 'white', marginTop: 20, textAlign: 'center', marginInline: 20 }}>New to Jist?</Text>
        
        <Link href={'/chatListView'} asChild>
          <Pressable onPress={handleSignUp}>
            <Text style={styles.usrAuthLink}>Sign Up</Text>
          </Pressable>
        </Link>        
            
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