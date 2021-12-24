import * as React from 'react';
import { Text, View,Image,ScrollView,TouchableOpacity } from 'react-native';
import {Ionicons} from "react-native-vector-icons"
import moment from 'moment'


export default class Footer extends React.Component {

state={
  likes: parseInt(this.props.post.likes),
  isLiked: false
}

handleLiked=()=>{
  this.state.isLiked ? this.setState({likes: this.state.likes-1}) : this.setState({likes: this.state.likes+1})
  this.setState({isLiked: !this.state.isLiked})
}
  
  render(){
  return (
      <View style={{marginLeft: 13}}>
      <View style={{flexDirection: "row",alignItems: "flex-start"}}>
      <TouchableOpacity onPress={()=>this.handleLiked()} >
      {this.state.isLiked ? <Ionicons name={"heart"} size={26} color="red" /> :
      <Ionicons name={"heart-outline"} size={26}/>
      }
      </TouchableOpacity>
      <Ionicons name={"chatbubble-outline"} size={25} style={{marginLeft: 20}}/>
      <Ionicons name={"paper-plane-outline"} size={25} style={{marginLeft: 20}}/>
      <View style={{flex: 1,alignItems: "space-between"}}>
      <Ionicons name={"bookmark-outline"} size={25} style={{paddingRight: 20}}/>
      </View>
      </View>
      <View style={{marginTop: 10}}>
      <Text style={{fontWeight: "600",fontSize: 14}}>{this.state.likes} likes</Text>
      <View style={{flexDirection: "row",alignItems: "center"}}>
      <Text style={{marginVertical: 8,fontWeight: "600",marginRight: 10,fontSize: 14}}>{this.props.post.authorName}</Text>
      <Text >{this.props.post.text}</Text>
      </View>
      <Text style={{color: "grey"}}>{moment(this.props.post.createdAt).fromNow()}</Text>
      </View>
      </View>
  )}
}