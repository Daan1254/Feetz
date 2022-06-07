import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';

export default function ChatTemplate(messages) {
    let latest_user = messages.messages[messages.messages.length -1].username
    let latest_message = messages.messages[messages.messages.length -1].message

    return (
        <View style={styles.container}>
            <Text style={{color: 'white', padding: 5}}>{latest_user}: {latest_message}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: "95%",
        height: 'max-content',
        backgroundColor: '#333',
        marginTop: 10,
        marginLeft: 3,
        borderRadius: 10
    }
})