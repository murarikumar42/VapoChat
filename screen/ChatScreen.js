import React, { useLayoutEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet,View,Text } from 'react-native';
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import { AntDesign,FontAwesome,Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { Platform } from 'react-native';
import { ScrollView } from 'react-native';
import { TextInput } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import { Keyboard } from 'react-native';
import { db ,auth} from '../firebase';
import firebase from 'firebase';

const ChatScreen=({navigation,route})=>{

    const [input,setInput]=useState("");
    const [messages,setMessages]=useState([]);
    useLayoutEffect(()=>{
        navigation.setOptions({
            title:"Chat",
            headerBackTitleVisible:false,
            headerTitleAlign:"left",
            headerTitle:()=>(
                <View 
                    style={{
                        flexDirection:"row",
                        alignItems:"center"
                    }}
                >
                    <Avatar rounded source={{
                        uri:messages[0]?.data.photoURL || "https://image.shutterstock.com/image-vector/logo-talk-speak-speech-chat-260nw-1190343697.jpg"
                    }}/>
                    <Text
                        style={{color:"white", marginLeft:10,fontWeight:600}}
                    >{route.params.chatName}</Text>
                </View>
            ),
            headerLeft:()=>(
                <TouchableOpacity
                    style={{marginLeft:10}}
                    onPress={navigation.goBack}
                >
                    <AntDesign name="arrowleft" size={24} color="white"/>
                </TouchableOpacity>
            ),
            headerRight:()=>(
                <View
                    style={{
                        flexDirection:"row",
                        justifyContent:"space-between",
                        width:80,
                        marginRight:20
                    }}
                >
                    <TouchableOpacity>
                        <FontAwesome name="video-camera" size={24} color="white"/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="call" size={24} color="white"/>
                    </TouchableOpacity>
                </View>
            )
        });
    },[navigation,messages]);

    const sendMessage=()=>{
        Keyboard.dismiss();
        db.collection('chats').doc(route.params.id).collection('messages').add({
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            message:input,
            displayName:auth.currentUser.displayName,
            email:auth.currentUser.email,
            photoURL:auth.currentUser.photoURL
        });
        setInput("");
    };

    useLayoutEffect(()=>{
        const unsubscribe=db.collection('chats').doc(route.params.id)
        .collection('messages').orderBy('timestamp',"asc")
        .onSnapshot((snapshot) =>setMessages(
                snapshot.docs.map((doc)=>({
                    id:doc.id,
                    data:doc.data(),
                }))
            ));
            return unsubscribe;
    },[route]);

    return(
        <SafeAreaView
            style={{flex:1,backgroundColor:"white"}}
        >
            <StatusBar style="light"/>
            <KeyboardAvoidingView
                behavior={Platform.OS==='ios'?"padding":"height"}
                style={styles.container}
                keyboardVerticalOffset={90}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>
                    <ScrollView contentContainerStyle={{paddingTop:15}}>
                        {messages.map(({id,data})=>(
                            data.email!==auth.currentUser.email?(
                                <View key={id} style={styles.receiver}>
                                    <Avatar
                                        position="absolute"
                                        rounded
                                        //web
                                        containerStyle={{
                                            position:"absolute",
                                            bottom:-15,
                                            right:-5,
                                        }}
                                        bottom={-15}
                                        right={-5}
                                        
                                        size={30}
                                        source={{
                                            uri:data.photoURL
                                        }}
                                    />
                                    <Text style={styles.receiverText}>
                                        {data.message}
                                    </Text>
                                    <Text style={styles.receiverName}>
                                        {data.displayName}
                                    </Text>
                                    
                                </View>
                            ):(
                                <View  style={styles.sender}>
                                    <Avatar
                                         position="absolute"
                                         rounded
                                         //web
                                         containerStyle={{
                                             position:"absolute",
                                             bottom:-15,
                                             right:-5,
                                         }}
                                         bottom={-15}
                                         right={-5}
                                         
                                         size={30}
                                         source={{
                                             uri:data.photoURL
                                         }}
                                    />
                                    <Text style={styles.senderText}>
                                        {data.message}
                                    </Text>
                                    <Text style={styles.senderName}>{data.displayName}</Text>
                                </View>
                            )
                        ))}
                    </ScrollView>
                    <View 
                        style={styles.footer}
                    >
                        <TextInput 
                            placeholder="Type your message here" 
                            style={styles.textInput}
                            onChangeText={(text)=>setInput(text)}
                            onSubmitEditing={sendMessage}
                        />
                        <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                            <Ionicons name="send" size={24} color="#2b68e6"/>
                        </TouchableOpacity>
                    </View>
                    </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
            
        </SafeAreaView>
    )
}
export default ChatScreen;

const styles=StyleSheet.create({
    container:{
        flex:1
    },
    footer:{
        flexDirection:"row",
        alignItems:"center",
        width:"100%",
        padding:15
    },
    textInput:{
        bottom:0,
        height:40,
        flex:1,
        marginRight:15,
        backgroundColor:"#ececec",
        padding:10,
        color:"grey",
        borderRadius:30
    },
    receiverText:{
        color:"black",
        fontWeight:"500",
        marginLeft:10
    },
    senderText:{
        color:"white",
        fontWeight:"500",
        marginLeft:10,
        marginBottom:15
    },
    receiver:{
        padding:15,
        backgroundColor:"#ececec",
        alignSelf:"flex-end",
        borderRadius:20,
        marginRight:15,
        marginBottom:20,
        maxWidth:"80%",
        position:"relative",
    },
    sender:{
        padding:15,
        backgroundColor:"#2b68e6",
        alignSelf:"flex-start",
        borderRadius:20,
        marginRight:15,
        marginBottom:20,
        maxWidth:"80%",
        position:"relative",
    },
    senderName:{
        left:10,
        paddingRight:10,
        fontSize:10,
        color:"white"
    },
    receiverName:{
        textAlign:"right",
        right:10,
        paddingLeft:10,
        fontSize:10,
        color:"black"
    }
});