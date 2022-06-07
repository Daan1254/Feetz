import React from 'react';
import {View, Text, Image, Pressable, StyleSheet, Button} from 'react-native';
import 'react-native-gesture-handler'

export default function FeedItemScreen({navigation, route}) {
    let userData = route.params.userData
    
    return (
        <View>
            <Image style={styles.ImageBanner} source={{uri: route.params.data.backgroundImg}}/>
            <Text style={styles.title}>{route.params.data.title}</Text>
            <Text style={styles.description}>{route.params.data.information}</Text>
            <Pressable><Text onPress={() => {sendMessage(route.params.data.userid, userData, navigation)}}>Stuur Bericht</Text></Pressable>
            <Text onPress={() => {navigation.goBack()}}>Ga terug</Text>
        </View>
    )
}



const sendMessage = async (id, userData, navigation) => {
    try {
        let response = await fetch("http://localhost:8081/chats")
        let json = await response.json();
        if (json[0] == null) createNewChat(userData.id, id);

        json.forEach(element => {
            let allowed_users = JSON.parse(element.allowed_users) 
            console.log("Check 1: " + (allowed_users.users[0] == id && allowed_users.users[1] == userData.id) + " | Check 2: " + (allowed_users.users[0] == userData.id && allowed_users.users[1] == id))
            if ((allowed_users.users[0] == id && allowed_users.users[1] == userData.id) || (allowed_users.users[0] == userData.id && allowed_users.users[1] == id)) {
                loadChat(navigation, element.chat_id, userData.username)
            } else {
                createNewChat(userData.id, id, navigation, userData.username)
            }
        });
    }catch(e) {
        console.error(e)
    }
    finally{
        
    }
}

const createNewChat = (own_id, seller_id, navigation, user_name) => {
    postData('http://localhost:8081/createChat', { own_id: own_id, seller_id: seller_id })
    .then(chat_id => {
      loadChat(navigation, chat_id, user_name)
    });
}


const loadChat = async (navigation, chat_id, user_name) => {
    let response = await fetch("http://localhost:8081/getChat/" + chat_id)
    let chat_data = await response.json()

    console.log(chat_data)
    navigation.navigate("ChatScreen", {messages: JSON.parse(chat_data.messages), chat_id: chat_data.chat_id, user_name: user_name})
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
        height: 200
    },
    title : {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10,
        color: "gray"
    },
    description:  {
        fontSize: 15,
        fontWeight: 'bold',
        padding: 10,
        color: "gray"
    }
})