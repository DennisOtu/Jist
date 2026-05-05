//import { globalStyles } from '@/styles/global';
import React, { useRef, useState } from 'react';
import { Text, TextInput, ScrollView, StyleSheet, Button, KeyboardAvoidingView, FlatList, Platform, View, Pressable } from 'react-native';

export default function ChatPage() {
    const [text, setText] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const flatListRef = useRef(null);
    const sampleChatMsg = 'sample chat message sample chat message sample chat message sample chat message'

    return (
        <KeyboardAvoidingView style={styles.container} >
            <FlatList ref={flatListRef} inverted data={sampleChatMsg}
                renderItem={() => (
                    <>
                        <View style={ styles.messageBubbleLeft }>
                            <Text style={styles.messageText}>{ sampleChatMsg }</Text>
                        </View>
                        <View style={ styles.messageBubbleRight }>
                            <Text style={styles.messageText}>{ sampleChatMsg }</Text>
                        </View>
                    </>
                )}
            />
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} value={message} onChangeText={setMessage}
                    placeholder="Type your message..." onSubmitEditing={()=>{}}
                />
                <Pressable style={styles.sendBtn}>
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