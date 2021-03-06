import React, { useEffect, useState } from 'react';
import { StyleSheet } from "react-native";
import { ListItem,Avatar } from "react-native-elements";
import { db } from '../firebase';
const CustomListItem=({id,chatName,enterChat})=>{

    const [chatMessages,setChatMessages]=useState([]);

    useEffect(()=>{
        const unsubscribe=db.collection('chats').doc(id).collection('messages')
        .orderBy('timestamp','asc').onSnapshot(snapshot=>(
            setChatMessages(snapshot.docs.map(doc=>doc.data()))
        ))
        return unsubscribe;
    })

    return(
        <ListItem 
        onPress={()=>enterChat(id,chatName)}
        key={id} bottomDivider>
            <Avatar
                rounded
                source={{
                    uri: chatMessages?.[0]?.photoURL || "https://image.shutterstock.com/image-vector/logo-talk-speak-speech-chat-260nw-1190343697.jpg"
                }}
            />
            <ListItem.Content>
                <ListItem.Title style={{fontWeight:600}}>
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle
                    numberOfLines={1}    
                    ellipsizeMode="tail"
                >
                   {chatMessages?.[chatMessages.length-1]?.displayName}:{chatMessages?.[chatMessages.length-1]?.message}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    );
};
export default CustomListItem;

const styles=StyleSheet.create({

});