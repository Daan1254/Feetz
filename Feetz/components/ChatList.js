import React from 'react';
import {View, Text,  ActivityIndicator, FlatList,Pressable} from 'react-native';

import ChatTemplate from './ChatTemplate';


export default function ChatList({route, navigation, userData}) {

    let url = "http://localhost:8081/getUserchats/" + userData.id
    const [isLoading, setLoading] = React.useState(true)
    const [chats, updateChats] = React.useState([])
    const getChats = async () => {
        try {
            let response = await fetch(url)
            let json = await response.json()
            updateChats(json)
        }
        catch(e) {
            console.error(e)
        }
        finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        getChats()
    }, [url])
    return (
        <View>
            {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={chats}
          keyExtractor={({ chats }, key) => key}
          renderItem={({ item }) => (
              <Pressable onPress={async () => {
                navigation.navigate("ChatScreen", {messages: JSON.parse(item.messages), chat_id: item.chat_id, user_name: userData.username})
              }}>
               
                <ChatTemplate
                messages={JSON.parse(item.messages)}
                />
              </Pressable>
          )}
        />
      )}
        </View>
    )
}
