import * as React from 'react';
import { Text, View, FlatList, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChatListItem from "../components/ChatListItem"



export default class Chats extends React.Component{

  state={
    currentMessage: '',
    currentUser: {},
    users: []
  }
  

  getUsers=async()=>{
    const token = await AsyncStorage.getItem('token')
    fetch('http://10.113.60.241:5000/users',{
      headers:new Headers({
          Authorization:"Bearer "+token
      })
  }).then(
      res=>res.json())
    .then((data)=>this.setState({users: data}))
    .catch(err=>console.log(err))
  }

  getCurrentUser=async()=>{
    const token = await AsyncStorage.getItem('token')
    fetch('http://10.113.60.241:5000/currentUser',{
      headers:new Headers({
          Authorization:"Bearer "+token
      })
  }).then(
      res=>res.json())
    .then((data)=>this.setState({currentUser: data}))
    .catch(err=>console.log(err))
  }

  componentDidMount(){
    this.getUsers()
    this.getCurrentUser()
  }

  render(){
  let users=Object.values(this.state.users)
  let filteredUsers=users.filter((item)=>
    item._id !== this.state.currentUser._id)
  return (
    <View style={{flex: 1,backgroundColor: "white"}}>
    <FlatList 
    data={filteredUsers}
    keyExtractor={(item)=>item._id}
    renderItem={({item})=> <ChatListItem chatRoom={item} navigation={this.props.navigation} currentUser={this.state.currentUser}/>}
    />
    </View>
  )}
}
