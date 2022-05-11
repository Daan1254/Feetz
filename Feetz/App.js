import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import LoginPage from './screens/login'

const Stack = createNativeStackNavigator();

const App = () => {
    return ( 
        <LoginStack/>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


const LoginStack = () => { 
    return (
        <NavigationContainer>
            <Stack.Navigator
            screenOptions={{
                headerShown: false
            } 
            }>
                <Stack.Screen
                name='login'
                component={LoginPage}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}


export default App;