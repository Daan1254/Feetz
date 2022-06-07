import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  TextInput 
} from "react-native";
import React from "react";
import Message from "./Message";

import FeedItem from "./FeedItem";

// const [isLoading, setLoading] = React.useState(true);
//   const [chat, setChat] = React.useState([]);
//   const [user, setuser] = React.useState([]);
//   let users = [];
//   let chats = [];
//   let url = "http://localhost:8081/chats/";
//   const getChats = async () => {
//     try {
//       const response = await fetch(url);
//       const json = await response.json();
//       console.log(JSON.parse(json[0].allowed_users).users);
//       console.log(data.id);

//       //   get user -----------------------------------------
//       users = JSON.parse(json[0].allowed_users).users;
//       var toRemove = data.id.toString();
//       var index = users.indexOf(toRemove);
//       if (index > -1) {
//         //Make sure item is present in the array, without if condition, -n indexes will be considered from the end of the array.
//         users.splice(index, 1);
//       }
//       const res = await fetch("http://localhost:8081/users");
//       const jason = await res.json();
//       let name = null;
//       for(let i = 0; i < jason.length; i++){
//         if(jason[i].id == users[0]){
//             // console.log(jason[i].username);
//             setuser(jason[i].username);
//             chats.push({name: jason[i].username});
//         }
//       }
//       console.log(chats[0]);
//       // ------------------------------------------------------------
//       setChat(json);
//     } catch (e) {
//       console.error(e);
//     } finally {
//       setLoading(false);
//     }
//   };
//   React.useEffect(() => {
//     getChats();
//   }, [url]);

export default function chat({ navigation, route, data }) {
  const [isLoading, setLoading] = React.useState(false);
  const [currentMessage, setMessage] = React.useState("");
  const [messages, updateMessages] = React.useState(route.params.messages)
  console.log(messages)


  const sendMessage = (chat_id, message, username) => {

    postData('http://localhost:8081/sendChat', { chat_id: chat_id, message: message, username: username })
    .then(chat_data => {
      console.log(chat_data)
      updateMessages(JSON.parse(chat_data))
    });
  }
  return (
    <View style={{ overflow: "scroll", height: '85%' }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={messages}
          keyExtractor={({ chats }, key) => key}
          renderItem={({ item }) => (

              <Message 
              message={item.message}
              author={item.username}
              date={item.date}
              />
          )}
        />
      )}
      <View style={styles.sendMessageContainer}>
            <TextInput
            style={styles.messageInput}
            onChangeText={text => setMessage(text)}
            defaultValue={''}/>
            <Pressable onPress={() => {sendMessage(route.params.chat_id, currentMessage, route.params.user_name)}} style={styles.sendBtn}><Text>Stuur</Text></Pressable>
      </View>
    </View>
  );
}




async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

const styles = StyleSheet.create({
  ImageBanner: {
    width: "100%",
    height: 200,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
    color: "gray",
  },
  description: {
    fontSize: 15,
    fontWeight: "bold",
    padding: 10,
    color: "gray",
  },
  sendMessageContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'row'
  },
  messageInput: {
    display: 'flex',
    justifyContent: 'center',
    width: '80%',
    height: 30  ,
    borderWidth: 1,
    borderColor: '#333'
  },
  sendBtn: {
    padding: 7,
    backgroundColor: '#68BBE3',
    fontWeight: 'bold',
    color: "white",
    borderRadius: 5
  }
});
