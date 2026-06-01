import { Link } from 'expo-router';
import { Text, FlatList, StyleSheet, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import socket from '../utils/socket.js';

export default function ChatListPage(){
	const { userId } = useLocalSearchParams();
    
	const fetchUsers = async () => {
		const response = await fetch('http://192.168.0.101:5000/api/v1/auth/allusers', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                userId: userId,
            }),
            credentials: 'include'		
		});
		
		if (!response.ok) throw new Error('Unable to fetch users');
		return response.json();
	};
		
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

    const ListItem = ({ name, id }: { name: string; id: string }) => (
        <Link href={{ pathname: "/chatInputView", params: { chatName: `${name}`, chatId: `${id}`, userId: `${userId}` }}}  
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
            <FlatList data={users} renderItem={({item}) => <ListItem  name={item.name} id={item._id} />} keyExtractor={item => item._id.toString()}/>
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