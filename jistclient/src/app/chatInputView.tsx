import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect, useLayoutEffect, useState, useCallback } from 'react';
import { Text, TextInput, StyleSheet, KeyboardAvoidingView, FlatList, View, Pressable } from 'react-native';
import socket from '../utils/socket.js';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useFocusEffect } from '@react-navigation/native';

export default function ChatInputPage() {
    const srvIP = '192.168.0.100'
    const { chatName, chatId, userName, userId } = useLocalSearchParams();
    const navigation = useNavigation();
    const [ inputMsg, setInputMsg ] = useState('');
    const [ msgIds, setMsgIds ] = useState(['']);
	const queryClient = useQueryClient();
    
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
		//console.log(res.json());
        return res.json();
    }    
	
    socket.on('chat message', (newMsg) => {
        console.log(`Message from ${newMsg.sender} : ${newMsg.text}`);
        const newMsgIds = [...msgIds, newMsg._id ];
        setMsgIds(newMsgIds);
    });
	
    socket.on('socketID',(ID) => {
        console.log(`My Socket Id: ${ID}`)
        //sessionStorage.setItem('socketID', ID)
    });

    useLayoutEffect(() => {
        // Update the title based on dynamic data
        navigation.setOptions({ 
            title: chatName 
        });
        console.log('userName: ' + userName);
        console.log('userId: ' + userId);
        console.log('chatName: ' + chatName);
		console.log('chatId: ' + chatId);
    }, []); 

    const { data: msgThread, isPending, error } = useQuery({
        queryKey: ['msgThread', msgIds], // Unique key for caching. Add state variable to array to trigger refetch on variable change
        queryFn: fetchMsgThread,
		refetchOnMount: "always",
    });

    useFocusEffect(
        useCallback(() => {
            // Clear all active and inactive queries
            queryClient.removeQueries({ queryKey: ['msgThread'], exact: true });
        }, [queryClient, msgThread])
    );

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

    const Item = ({msg}:{msg: string}) => (
        <View style={styles.messageBubbleRight}>
            <Text style={styles.messageText}>{msg}</Text>
        </View>
    );  
	
/*
    if (isPending) return <Text>Loading...</Text>;
    if (isError) {
		return <Text>Error: {error?.message}</Text>;
  }
 */
 
    return (
        <KeyboardAvoidingView style={styles.container} >
            <FlatList inverted={true} data={msgThread} 
              renderItem={({item}) => <Item msg={item.text} />} keyExtractor={item => item.createdAt}
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