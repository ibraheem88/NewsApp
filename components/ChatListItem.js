import React from 'react'
import {View,Text,Image} from 'react-native'
import Pusher from 'pusher-js/react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

let channel={}
export default class ChatListItem extends React.Component{

  state={
    lastMessage: '',
    messages: [],
  }

    componentDidMount(){
      this.getLastMessage()
      const pusher = new Pusher('320c6db0db0698904fd9', {
        cluster: 'us2'
      });
      
      channel = pusher.subscribe('chatrooms');
      channel.bind('update', (data)=> {
        if(data.updated.lastMessage){
          this.getLastMessage()
        }})
        channel.bind('insert', (data)=> {
          if(data.lastMessage){
            this.getLastMessage()
          }
        })
    }

    componentWillUnmount() {
      channel.unbind_all()
      channel.unsubscribe()
  }

    getLastMessage=async ()=>{
      const chatRoomId=this.props.currentUser._id > this.props.chatRoom._id ? this.props.currentUser._id+'-'+this.props.chatRoom._id : this.props.chatRoom._id+'-'+this.props.currentUser._id
          fetch('http://10.113.60.241:5000/lastMessage',{
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
          },
            body: JSON.stringify({
              "chatRoomId": chatRoomId
            })
          }).then(
            res=>res.json())
          .then((data)=>{
            if(data)this.setState({lastMessage: data})}
            )
          .catch(err=>console.log(err))
        }

    render(){
    return(
        <TouchableOpacity style={{paddingTop: 25,padding: 10,paddingLeft: 15,flexDirection: "row",justifyContent: "space-between",borderBottomColor: "black",borderBottomWidth: 0.5}}
        onPress={()=>this.props.navigation.navigate('ChatRoom',{chatRoom: this.props.chatRoom,currentUser: this.props.currentUser})}>
        <View style={{flexDirection: "row"}}>
        <Image source={{uri: "https://10.113.60.241:5000/upload/"+this.props.chatRoom.imageUri}} style={{width:60,height: 60,borderRadius: 50}}/>
        <View style={{flexDirection: "column",marginLeft: 10,marfinTop: 10}}>
        <Text style={{fontWeight: "bold",fontSize: 15}}>{this.props.chatRoom.name}</Text>
        <Text style={{fontSize: 15,color: "grey"}}>{this.state.lastMessage}</Text>
        </View>
        </View>

        </TouchableOpacity>
    )
    }
}