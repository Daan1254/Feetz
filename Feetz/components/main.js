import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

import FeedScreen from './FeedScreen';
import AccountScreen from './Account';
import FeedItemScreen from './FeedItemScreen';
import Chat from './chat';
import FeedItem from './FeedItem';
import ChatList from './ChatList';


// const FeedScreenStack = () => {
//     return (
//         <Stack.Navigator screenOptions={{
//             headerShown: false
//         }}>
//             <Stack.Screen
//             component={FeedScreen}
//             name={"FeedScreen"}/>
//             <Stack.Screen
//             component={FeedItemScreen}
//             name={"FeedItemScreen"}/>
//         </Stack.Navigator>
//     )
// }

const  App = ({navigation, route}) => {
  let userData = route.params.data
  return (
    <Tab.Navigator >
    <Tab.Screen
        name="Feed"
        component={props => <FeedScreen {...props} userData={userData}/>}
        options={{
          tabBarLabel: 'Feed',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
       <Tab.Screen
        name="Account"
        component={() => <AccountScreen data={userData}/>}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={props => <ChatList {...props} userData={userData}/>}
        options={{
          tabBarLabel: 'Chats',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="chat" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
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

export default App;