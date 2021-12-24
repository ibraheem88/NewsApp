import * as React from 'react';
import { Text,View, ImageBackground, FlatList,TextInput, TouchableOpacity, KeyboardAvoidingView,Platform} from 'react-native';
import Chats from "../assets/chats"
import ChatMessage from '../components/chatMessage';
import Pusher from 'pusher-js/react-native'
import * as DocumentPicker from 'expo-document-picker';
import BG from '../assets/bg.png'
import * as FileSystem from 'expo-file-system'
import * as Notifications from 'expo-notifications';
import { Ionicons, Entypo} from '@expo/vector-icons';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);

let channel={}
let chatRoomId=null
export default class ChatRoomScreen extends React.Component{

  state={
    message: '',
    messageText: '',
    messages: [],
    userName: '',
    documentBlob: ''
  }

  componentDidMount(){
    chatRoomId=this.props.route.params.currentUser._id > this.props.route.params.chatRoom._id ? this.props.route.params.currentUser._id+'-'+this.props.route.params.chatRoom._id : this.props.route.params.chatRoom._id+'-'+this.props.route.params.currentUser._id
    this.getMessages()
    const pusher = new Pusher('320c6db0db0698904fd9', {
      cluster: 'us2'
    });
    
    channel = pusher.subscribe('chatrooms');
    channel.bind('update', (data)=> {
      const keys = Object.keys(data.updated)
      const message=keys[1]
      if(data.updated[message]){
        this.setState({messages: [...this.state.messages,data.updated[message]] })
      }
    })
    channel.bind('insert', (data)=> {
      if(data.messages){
        this.setState({messages: data.messages})
      }
    })
  }
  
  sendPushNotification=async (message)=>{
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: true,
      }),
    });
    fetch("https://exp.host/--/api/v2/push/send",{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: this.props.route.params.chatRoom.token,
        sound: 'default',
        title: this.props.route.params.currentUser.name+" sent a message",
        body: message
      })
    }).then(
      res=>res.json())
    .catch(err=>console.log(err))
  }

  getMessages=async ()=>{
        fetch('http://10.113.60.241:5000/messages',{
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
          if(data)this.setState({messages: data.messages,lastMessage: data.lastMessage})}
          )
        .catch(err=>console.log(err))
      }

  componentWillUnmount() {
    channel.unbind_all()
    channel.unsubscribe()
}

  sendMessage=async ()=>{
    fetch('http://10.113.60.241:5000/newMessage',{
      method: "POST",
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
    },
      body: JSON.stringify({
        "message": this.state.message,
        "sentBy": this.props.route.params.currentUser._id,
        "sentTo": this.props.route.params.chatRoom._id,
        "type": "text",
        "chatRoomId": chatRoomId
      })
    }).then(
      res=>res.json())
    .then((data)=>{console.log(data)
    this.sendPushNotification(this.state.message)
    this.setState({message: ""})})
    .catch(err=>console.log(err))
  }
  


  handleSend=()=>{
    if(this.state.message){
      this.sendMessage()
    }
    else{
      console.warn("Microphone")
    }
  }

  render(){
  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    keyboardVerticalOffset={60}>
    <ImageBackground style={{width: '100%',height: '100%'}} source={{uri: "https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg"}}>
    <FlatList
    inverted={-1}
    contentContainerStyle={{ flexDirection: 'column-reverse' }}
    data={this.state.messages}
    renderItem={({item})=><ChatMessage message={item} currentUser={this.props.route.params.currentUser._id}/>}
    keyExtractor={(item,index)=>index.toString()}
    />
    <View style={{paddingBottom: 8,flexDirection: "row",marginTop: 0}}>
    <View style={{width: "78%",flex: 1,borderRadius:45,marginHorizontal: 10,backgroundColor: "white",padding: 10,flexDirection: 'row',alignItems: 'center'}}>
    <Ionicons
    style={{paddingLeft: 10}}
    name="happy-outline"
    size={30}
    color="grey"
  />
  <TextInput style={{flex: 1,paddingLeft: 10}} multiline value={this.state.message} onChangeText={(value)=>this.setState({message: value})}/>
    {!this.state.message && <Ionicons
    onPress={()=>this.props.navigation.navigate("Send Image",{messages: this.state.messages,chatRoomId: chatRoomId,sentBy:this.props.route.params.currentUser._id,sentTo: this.props.route.params.chatRoom._id })}
    name="camera"
    size={30}
    color="grey"
  />}
  <Entypo
    style={{paddingLeft: 10,paddingRight: 5 }}
    onPress={()=>this.getDocument()}
    name="attachment"
    size={25}
    color="grey"
  />
    </View>
    <TouchableOpacity style={{backgroundColor: "#0C6157",justifyContent: "center",height: 60,width: '15%',borderRadius: 50,alignItems: "center",marginRight: 8}} onPress={()=>this.handleSend()}>
    {this.state.message ?
    <Ionicons
    name="send"
    size={24}
    color="white"/> :
    <Ionicons
    name="mic"
    size={25}
    color="white"/>
    }
  
    </TouchableOpacity>
    </View>
    </ImageBackground>
    </KeyboardAvoidingView>
  )}
}
