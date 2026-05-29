import { Link } from 'expo-router';
import { Text, FlatList, StyleSheet, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import socket from '../utils/socket.js';
import { useEffect } from 'react';

const fetchUsers = async () => {
    const response = await fetch('http://192.168.0.141:5000/api/v1/auth/allusers');
    if (!response.ok) throw new Error('Unable to fetch users');
    return response.json();
};

export default function ChatListPage(){
	const { userName, userId } = useLocalSearchParams();
    
    const { data: users, isPending, error } = useQuery({
        queryKey: ['users'], // Unique key for caching
        queryFn: fetchUsers,
    });

	socket.on('connect', connectUser);

    function connectUser () {  
        const usr = userId 
        if (!usr) return;
        socket.emit('userConnected', usr);
    }

    const Item = ({ name, id }: { name: string; id: string; }) => (
        <Link href={{ pathname: "/chatInputView", params: { chatName: `${name}`, chatId: `${id}`, userName: `${userName}`, userId: `${userId}` }}}  
            onPress={() => console.log(`${name} chat link pressed`)} asChild >
                <Pressable style={styles.chatLink}>
                    <Image style={styles.chatLinkImg} source={{ uri: 'https://placehold.net/avatar-5.png' }}/>        
                    <Text style={styles.chatLinkName}>{name}</Text>
                </Pressable>
        </Link> 
    );    

    if (isPending) return <Text>Loading...</Text>;
    if (error) return <Text>Error: {error.message}</Text>;	

    return (
        <SafeAreaView>
            <FlatList data={users} renderItem={({item}) => <Item  name={item.name} id={item._id} />} keyExtractor={item => item.id}/>
        </SafeAreaView>          
    );
}

const styles = StyleSheet.create({
    chatLink: {
        flexDirection: 'row',
        height: 80,
        backgroundColor: '#e1e1e1af',
        borderRadius: 12,
        margin: 2,
        padding: 5,
    },
    chatLinkImg: {
        width: 70,
        height: 70,
    },
    chatLinkName: {
        fontSize: 18,
        padding: 10,
    }
});  