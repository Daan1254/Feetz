import React from "react";
import {View, Text, StyleSheet} from 'react-native';
export default function Message({message, author, date}) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={{color: 'white'}}>{author}</Text>
                <Text style={{color: 'white'}}>{date}</Text>
            </View>
            <Text style={styles.message}>{message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '95%',
        height: 'max-content',
        marginTop: 15,
        marginLeft: 5,
        backgroundColor: '#333',
        color: 'white',
        borderRadius: 10
    },
    header: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5
    },
    message : {
        marginTop: 5,
        padding: 5,
        color: 'white'
    }
})