import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import LoginScreen from './screen/LoginScreen';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './screen/RegisterScreen';
import HomeScreen from './screen/HomeScreen';
import AddChatScreen from './screen/AddChatScreen';
import ChatScreen from './screen/ChatScreen';

const Stack=createStackNavigator();

const globalScreenOptions={
  headerStyle:{backgroundColor:"#2c6bed"},
  headerTitleStyle:{color:"white"},
  headerTintColor:"white",
}
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
      //initialRouteName="Home" 
      screenOptions={globalScreenOptions}>
      <Stack.Screen
        options={{
          title:"VapoChat | Sign In"
        }}
        name='Login' component={LoginScreen}/>
        <Stack.Screen name='Register' component={RegisterScreen}/>
        <Stack.Screen name='Home' component={HomeScreen}/>
        <Stack.Screen name="AddChat" component={AddChatScreen}/>
        <Stack.Screen name="chat" component={ChatScreen}/>
      </Stack.Navigator>
     
    </NavigationContainer>
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
