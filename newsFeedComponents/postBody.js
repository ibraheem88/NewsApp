import * as React from 'react';
import { Text, View,Image,ScrollView,Dimensions } from 'react-native';
import ProfilePhoto from "./profilePhoto"


export default class Body extends React.Component {


  state={
    image: null,
  }
  componentDidMount(){

  }

  getImage=async()=>{

  }

  render(){
  return (
      <View style={{marginBottom: 10}}>
      <Image source={{uri: "http://10.113.60.241:5000/upload/posts/"+this.props.image}} style={{width: Dimensions.get('window').width,height: Dimensions.get('window').width}}/>
      </View>
  )}
}