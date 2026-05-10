import { Link } from 'expo-router';
import { useState } from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';

export default function HomeScreen() {
  const [ userName, setUserName] = useState('');
  const [ userNum, setUserNum] = useState('');

  const handleSignIn = async () => {
    console.log(`User Name: ${userName}`);
    console.log(`User Number: ${userNum}`);
    const formData = new FormData();
    formData.append(userName, userNum);

    try {
      const res = await fetch('http://localhost:5000/api/v1/auth/signup', {
        method:  'POST',
        body: formData,
				headers: {'Content-Type': 'multipart/form-data'},
        credentials: 'include'
      })
      
      const data = await res;
    
      if (data) {
        console.log(`${data.json()}`)
      }
    } catch (error) {
        console.log(error)
    }
    setUserName('');
    setUserNum('');
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#007bff', justifyContent: 'center' }}>
      <Text style={{ textAlign: 'center', fontSize: 60, fontWeight: 900, color:  'white'}}>
        JIST
      </Text>
      <TextInput style={styles.singInInpt} value={userName} onChangeText={(text)=>{setUserName(text)}} placeholder='Name'/>
      <TextInput style={styles.singInInpt} value={userNum} onChangeText={(text)=>{setUserNum(text)}} placeholder='Number'/>
      <Link href='/chatListView' style={styles.signInLink} onPress={handleSignIn}>
        Sign In
      </Link>
    </View>
  );
}

const styles = StyleSheet.create ({
  singInInpt: {
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
  signInLink: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color:  'white',
    marginTop: 20,
  }
});