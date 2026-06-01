import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useLayoutEffect, useState } from 'react';
import { Text, TextInput, StyleSheet, KeyboardAvoidingView, FlatList, View, Pressable } from 'react-native';
import socket from '../utils/socket.js';
import { useQuery } from '@tanstack/react-query';

export default function ChatInputPage() {
    const srvIP = '192.168.0.101'
    const { chatName, chatId, userId } = useLocalSearchParams();
    const navigation = useNavigation();
    const [ inputMsg, setInputMsg ] = useState('');
    const [ msgIds, setMsgIds ] = useState(['']); 
    const roomId = `${userId}${chatId}`;

	const fetchMsgThread = async () => {
        const res = await fetch(`http://${srvIP}:5000/api/v1/room/messages`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                sender: userId,
                receiver: chatId
            }),
            credentials: 'include',
        });
		
        if (!res.ok) throw new Error('Unable to fetch message thread');
		console.log('data: message thread');
        return res.json();
    }    
	
    socket.on('chat message', (newMsg) => {
        const newMsgIds = [...msgIds, newMsg._id ];
        setMsgIds(newMsgIds);
    });
	
    socket.on('socketID',(ID) => {
        console.log(`My Socket Id: ${ID}`)
    });

    useLayoutEffect(() => {
        // Update the title based on dynamic data
        navigation.setOptions({ 
            title: chatName 
        });
    }, []); 

    const { data: msgThread, isPending, error } = useQuery({
        queryKey: ['msgThread', msgIds], // Unique key for caching. Add state variable to array to trigger refetch on variable change
        queryFn: fetchMsgThread,
		gcTime: 0,
    });

    const addMsgToRoomDb = async (roomName: any, messageId: any, senderId: any, receiverId: any) => {
        const res = await fetch(`http://${srvIP}:5000/api/v1/room/messages/add`,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: roomName,
                messages: messageId,
				sender: senderId,
				receiver: receiverId,
            })
        });
		if (!res.ok) throw new Error('Unable to add message to room db');
        return await res.json();
    }
    
    const handleSend = async (inputMsg: string) => {
        console.log('send button pressed');
        if (inputMsg.trim() === '') return;

        try {
            const res = await fetch(`http://${srvIP}:5000/api/v1/message/create`, {
                method:  'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                    text : inputMsg,
                    sender : userId,
                    receiver: chatId,
                }),
                credentials: 'include'
            }).then(response=>response.json()); 
			const newMsgIds = [...msgIds, res._id ];
			setMsgIds(newMsgIds);
			socket.emit('chat message', res);
			addMsgToRoomDb(roomId, res._id, userId, chatId)
			setInputMsg('');
        } catch (error) {
            console.log(error);
        }        
    };

    const ListItem = ({msg, sentBy}:{msg: string; sentBy: string}) => (
        <View style={sentBy === userId ? styles.messageBubbleRight : styles.messageBubbleLeft}>
            <Text style={styles.messageText}>{msg}</Text>
        </View>
    );  
	
    if (isPending) {
		console.log('fetching data...');
		return (
			<KeyboardAvoidingView style={styles.container} >
				<View style={{ flex: 1 }}></View>
				<View style={styles.inputContainer}>
					<TextInput style={styles.input} value={inputMsg} onChangeText={ (text) => setInputMsg(text) } 
						placeholder="Type your message..."
					/>
					<Pressable onPress={() => handleSend(inputMsg)} style={styles.sendBtn}>
						<Text style={{ color: 'white', fontWeight: 'bold'}}>Send</Text>
					</Pressable>
				</View>
			</KeyboardAvoidingView>          
		);
	}
    if (error) {
		console.log(`Error: ${error.message}`);
		return (
			<KeyboardAvoidingView style={styles.container} >
				<FlatList inverted={true} data={msgThread} 
				  renderItem={({item}) => <ListItem msg={item.text} sentBy={item.sender} />} keyExtractor={item => item._id.toString()}
				/>
				<View style={styles.inputContainer}>
					<TextInput style={styles.input} value={inputMsg} onChangeText={ (text) => setInputMsg(text) } 
						placeholder="Type your message..."
					/>
					<Pressable onPress={() => handleSend(inputMsg)} style={styles.sendBtn}>
						<Text style={{ color: 'white', fontWeight: 'bold'}}>Send</Text>
					</Pressable>
				</View>
			</KeyboardAvoidingView>          
		);
	};
 
    return (
        <KeyboardAvoidingView style={styles.container} >
            <FlatList inverted={true} data={msgThread} 
              renderItem={({item}) => <ListItem msg={item.text} sentBy={item.sender} />} keyExtractor={item => item._id.toString()}
            />
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} value={inputMsg} onChangeText={ (text) => setInputMsg(text) } 
                    placeholder="Type your message..."
                />
                <Pressable onPress={() => handleSend(inputMsg)} style={styles.sendBtn}>
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
        paddingInline: 20,
		
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
		marginBottom: 20,
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
        backgroundColor: '#397c41'
    },
    messageBubbleRight: {
		flex: 1,
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