import { StyleSheet, Text, View , TextInput, Button } from 'react-native';


import React from 'react'


const login = () => {
    const [userData, setuserData] = React.useState({
        username: '',
        password: '',
    })
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Feetz</Text>


                <View style={styles.loginContainer}>
                    <Text style={styles.loginHeader}>Login</Text>
                    <TextInput       
                    placeholder={'gebruikersnaam'}
                    placeholderTextColor='white'
                    onChange={Text => userData.username = Text}
                    style={styles.loginInput}
                    />
                    <TextInput       
                    placeholder={'wachtwoord'}
                    placeholderTextColor='white'
                    secureTextEntry={true}
                    onChange={Text => userData.password = Text}
                    style={styles.loginInput}
                    />

                    <Button
                    title='Inloggen'
                    color={'white'}
                    style={styles.loginBtn}/>
                </View>
            </View>
        </View>
    )
}





const styles = StyleSheet.create({
    container: {
        height:'100%', 
        backgroundColor: '#30106B'
    },

    loginBtn : {
        marginTop: '2%',
        padding: '10px',
        backgroundColor: '#333',
        width: 150
    },

    loginHeader : {
        fontSize: 25,
        color: 'white',
        fontWeight: 'bold'
    },

    loginInput: {
        padding: '2%',
        backgroundColor: '#333',
        marginTop: '3%',
        width: 150,
        color: 'white',
        borderBottomColor: 'white',
        borderBottomWidth: '1px',
    },

    header: {
        marginTop: 50,
        display: 'flex',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 30,
        color: 'white'
    },

    loginContainer : {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '70%'
    }
})

export default login