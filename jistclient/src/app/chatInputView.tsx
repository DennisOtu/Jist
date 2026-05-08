//import { globalStyles } from '@/styles/global';
import React, { useState } from 'react';
import { Text, TextInput, StyleSheet, KeyboardAvoidingView, FlatList, View, Pressable } from 'react-native';

export default function ChatInputPage() {
    const [inpText, setInptext] = useState('');
    const [messages, setMessages] = useState([{ id: '00a', msg: 'Sample message' }]);

    const handleSend = (inpText: string) => {
        console.log('send button pressed');
        if (inpText.trim() === '') return;
        const randomInt = Math.floor(Math.random() * 1000)
        const randomString = randomInt.toString();
        const newMessages = [...messages, { id: randomString , msg: inpText }];
        setMessages(newMessages);
        console.log('input: ' + inpText);
        console.log(newMessages);
        setInptext('');
    };

    const Item = ({msg}:{msg: string}) => (
        <View style={styles.messageBubbleRight}>
        <Text style={styles.messageText}>{msg}</Text>
        </View>
    );    
                            
    return (
        <KeyboardAvoidingView style={styles.container} >
            <FlatList inverted data={messages} 
              renderItem={({item}) => <Item msg={item.msg} />} keyExtractor={item => item.id}/>

            <View style={styles.inputContainer}>
                <TextInput style={styles.input} value={inpText} onChangeText={ (text) => setInptext(text) } 
                    placeholder="Type your message..."
                />
                <Pressable onPress={() => handleSend(inpText)} style={styles.sendBtn}>
                    <Text style={{ color: 'white', fontWeight: 'bold'}}>Send</Text>
                </Pressable>
            </View>
        </KeyboardAvoidingView>          
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        justifyContent: 'center',
        padding: 20
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
    },    
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 8,
        marginRight: 10,
    },
    messageBubbleLeft: {
        alignSelf: 'flex-start',        
        padding: 10,
        marginBlock: 5,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        borderBottomRightRadius: 12,
        maxWidth: '80%',
        backgroundColor: '#00e36a'
    },
    messageBubbleRight: {
        alignSelf: 'flex-end',        
        padding: 10,
        marginBlock: 5,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        borderBottomLeftRadius: 12,
        maxWidth: '80%',
        backgroundColor: '#0084ff'
    },
    sendBtn: {
        padding: 10,
        borderRadius: 15,
        backgroundColor: '#0084ff',
    },
    sentMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#0084ff',
    },
    receivedMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#e5e5e5',
    },
    messageText: { 
        color: 'white'
    },
});  