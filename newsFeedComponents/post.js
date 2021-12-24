import * as React from 'react';
import { Text, View,Image,ScrollView } from 'react-native';
import ProfilePhoto from "./profilePhoto"
import Header from "./postHeader"
import Body from "./postBody"
import Footer from "./postFooter"


export default class Post extends React.Component {

  state={
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoVut3HcwuDizKCvyn61Jk6VdpRRr_z4IIaA&usqp=CAU"
  }

  render(){
  return (
    <View>
    <Header post={this.props.post}/>
    <Body image={this.props.post.image} />
    <Footer post={this.props.post}/>
    </View>
  )}
}