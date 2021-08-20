import React, { useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView } from "react-native";
import { View } from "react-native"
import { StyleSheet } from "react-native";
import { Input ,Text} from "react-native-elements";
import { Button } from "react-native";
import {auth} from "../firebase";

const RegisterScreen=({navigation})=>{

    const [name,setName]=useState("") ;
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [imageUrl,setImageUrl]=useState("");

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerBackTitle:"Back To Login",
        })
    },[navigation])

    const register=()=>{
        auth.createUserWithEmailAndPassword(email,password)
        .then((authUser)=>{
            authUser.user.updateProfile({
                displayName:name,
                photoURL:imageUrl||"../assets/avatar.jpg"
            })
        })
        .catch((error)=>alert(error.message));
    };

    return(
        <KeyboardAvoidingView style={styles.container}>
            <StatusBar style="light"/>
            
            <Text h4 style={{marginBottom:50}}>Create A VapoChat Account</Text>

            <View style={styles.inputContainer}>
                <Input placeholder="Full Name" autoFocus type="text"
                    value={name} onChangeText={(text)=>setName(text)}/>
                <Input placeholder="Email"  type="email"
                    value={email} onChangeText={(text)=>setEmail(text)}/>
                <Input placeholder="Password" secureTextEntry type="password"
                    value={password} onChangeText={(text)=>setPassword(text)}/>
                <Input placeholder="Profile picture URL (optional)" autoFocus type="text"
                    value={imageUrl} onChangeText={(text)=>setImageUrl(text)} onSubmitEditing={register}/>
            </View>
            <Button 
                style={styles.button}
                onPress={register}
                title="Register"
                raised
            />
            <View style={{height:50}}/>
        </KeyboardAvoidingView>
    )
}
export default RegisterScreen;

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        padding:10,
        backgroundColor:"white"
    },
    button:{
        width:200,
        marginTop:20
    },
    inputContainer:{
        width:300
    },
    

});