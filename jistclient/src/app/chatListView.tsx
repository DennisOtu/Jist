import { Link } from 'expo-router';
import { Text, FlatList, StyleSheet, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChatListPage(){
    const chats = [
                {id: '001', name: 'Nana'},
                {id: '002', name: 'Ama'},
                {id: '003', name: 'Gym'},
                {id: '004', name: 'Abbi'},
                {id: '005', name: 'Freda'},
                {id: '006', name: 'Patience'},
                {id: '007', name: 'Kweku'},
                {id: '008', name: 'John'},  
                {id: '009', name: 'Dennis'},
                {id: '010', name: 'Family Group'},
                {id: '011', name: 'David'},
                {id: '012', name: 'Kwame'},              
    ];
     
    const Item = ({name}:{name: string}) => (
        <Link href={{ pathname: "/chatInputView", params: { chatName: `${name}` }}}  
            onPress={() => console.log(`${name} chat link pressed`)} asChild>
                <Pressable style={styles.chatLink}>
                    <Image style={styles.chatLinkImg} source={{ uri: 'https://placehold.net/avatar-5.png' }}/>        
                    <Text style={styles.chatLinkName}>{name}</Text>
                </Pressable>
        </Link> 
    );    

    return (
        <SafeAreaView>
            <FlatList data={chats} renderItem={({item}) => <Item  name={item.name} />} keyExtractor={item => item.id}/>
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