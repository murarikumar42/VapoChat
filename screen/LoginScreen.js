import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet,Text,View } from "react-native";
import { Button,Input,Image } from "react-native-elements";
import { KeyboardAvoidingView } from "react-native";
import {auth} from "../firebase";
const LoginScreen=({navigation})=>{

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    useEffect(()=>{
        const unsubscribe= auth.onAuthStateChanged((authUser)=>{
            console.log(authUser)
            if(authUser){
                navigation.replace("Home");
            }
        });
        return unsubscribe;
    },[]);

    const signIn=()=>{
        auth.signInWithEmailAndPassword(email,password)
        .catch((error)=>alert(error));
    }

    return (
        <KeyboardAvoidingView behavior='padding' enabled style={styles.container}>
            <StatusBar style="light"/>
            <Image source={
                require('../assets/VapoChatLogo.jpg')
            }
            style={{width:200,height:200}}
            />
            <View style={styles.inputContainer}>
                <Input placeholder="Email" autoFocus type="Email" value={email} 
                onChangeText={(text)=>setEmail(text)}/>
                <Input placeholder="Password" secureTextEntry type="password"
                    value={password} onChangeText={(text)=>setPassword(text)}
                    onSubmitEditing={signIn}
                />

            </View>
            <View>
                <Button containerStyle={styles.button} onPress={signIn} title="Login"/>
                <Button containerStyle={styles.button}  type="outline" title="Register"
                    onPress={()=>navigation.navigate("Register")}/>
                <View style={{height:50}}/>
            </View>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen;

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        padding:10,
        backgroundColor:"white"
    },
    inputContainer:{
        width:300,
    },
    button:{
        width:200,
        marginTop:10
    }
});