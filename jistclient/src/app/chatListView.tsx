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
        <Pressable style={styles.chatLink} onPress={()=>console.log(`${name}'s chat link pressed`)}>
            <Image style={styles.chatLinkImg} source={require('./images/dpPlaceholder.png')}/>        
            <Text style={styles.chatLinkName}>{name}</Text>
        </Pressable> 
    );    

    return (
        <SafeAreaView>
            <FlatList data={chats} renderItem={({item}) => <Item  name={item.name} />} keyExtractor={item => item.id}/>
        </SafeAreaView>          
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
    chatLink: {
        flexDirection: 'row',
        backgroundColor: '#cdcdcd',
        borderRadius: 12,
        margin: 2,
    },
    chatLinkImg: {
        width: 70,
        height: 70,
    },
    chatLinkName: {
        fontSize: 20, 
        fontWeight: 'bold',
        padding: 10,
        color: '#0084ff' 
    }
});  