import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable, TextInput } from "react-native";
import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

// const Login = createMaterialBottomTabNavigator();
const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

// import Login from "./components/Login";
import Main from "./components/main";
import FeedScreen from "./components/FeedScreen";
import AccountScreen from "./components/Account";
import FeedItemScreen from "./components/FeedItemScreen";
import chat from "./components/chat";


let userData = undefined

const FeedScreenStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen component={Login} name="loginscreen"></Stack.Screen>
      <Stack.Screen component={FeedScreen} name="feedscreen" />
    </Stack.Navigator>
  );
};

const AccountScreenStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen component={AccountScreen} name="feedscreen" />
    </Stack.Navigator>
  );
};
const App = () => {
  return (
    <NavigationContainer >
      <Stack.Navigator>
        <Stack.Screen component={Login} name="Loginscreen"></Stack.Screen>
        <Stack.Screen component={Main} name="Logout"></Stack.Screen>
        <Stack.Screen component={FeedItemScreen} name="FeedItemScreen"></Stack.Screen>
        <Stack.Screen component={chat} name="ChatScreen"></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Login = ({ navigation }) => {
  let data = {
    username: "",
    password: "",
  };
  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={(Text) => (data.username = Text)}
        style={styles.input}
        placeholder="Username"
      ></TextInput>
      <TextInput
        onChangeText={(Text) => (data.password = Text)}
        style={styles.input}
        placeholder="Password"
      ></TextInput>

      <Pressable
        onPress={() => {
          inloggen(data, navigation);
        }}
      >
        <Text style={styles.btn}>Inloggen</Text>
      </Pressable>
    </View>
  );
};

const inloggen = async (data, navigation) => {
  const response = await fetch("http://localhost:8081/users/" + data.username);
  const json = await response.json();
  console.log(json[0].username);
  if (json[0].username == data.username && json[0].password == data.password) {
    navigation.navigate("Logout", { data: json[0] });
    return;
  } else {
    alert("fout inlog gegevens");
  }
};
// const FeedScreenStackNavigator = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen component={Login} name="loginscreen"></Stack.Screen>
//       <Stack.Screen
//         component={FeedScreen}
//         name="feedscreen"
//       />
//     </Stack.Navigator>
//   );
// };

/*const AccountScreenStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={AccountScreen}
        name="feedscreen"
      />
  </Stack.Navigator>
  )
}*/

const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Feed"
          component={FeedScreenStackNavigator}
          options={{
            tabBarLabel: "Feed",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Account"
          component={AccountScreenStackNavigator}
          options={{
            tabBarLabel: "Account",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "55%",
    height: 40,
    textAlign: "center",
  },
  btn: {
    fontWeight: "bold",
    textDecorationColor: "#b852bf",
    fontSize: 20,
  },
});

export default App;
