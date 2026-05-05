//import { globalStyles } from '@/styles/global';
import React, { useRef, useState } from 'react';
import { Text, TextInput, ScrollView, StyleSheet, Button, KeyboardAvoidingView, FlatList, Platform, View } from 'react-native';

export default function ChatPage() {
    const [text, setText] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const flatListRef = useRef(null);

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container} >
            <FlatList ref={flatListRef} inverted data={messages}
                renderItem={() => (
                <View style={ styles.messageBubble }>
                <Text style={styles.messageText}>samlple chat message</Text>
                </View>
                )}
            />
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} value={message} onChangeText={setMessage}
                    placeholder="Type your message..." onSubmitEditing={()=>{}}
                />
                <Button title="Send" onPress={()=>{}} />
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
    messageBubble: {
        padding: 10,
        margin: 5,
        borderRadius: 10,
        maxWidth: '80%',
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
        color: '#000'
    },
});