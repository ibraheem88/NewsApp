import * as React from 'react';
import { Text, View,Image,ScrollView,FlatList,TouchableOpacity,Button } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { StackActions } from '@react-navigation/native';
import {Ionicons,FontAwesome} from "react-native-vector-icons"

export default class AddPostScreen extends React.Component {

  state={
    images: [],
    selected: {uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPEAAADRCAMAAAAquaQNAAAAA1BMVEX///+nxBvIAAAAR0lEQVR4nO3BMQEAAADCoPVP7WULoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABuxZIAAeHuCGgAAAAASUVORK5CYII='}
  }

  componentDidMount(){
    this.props.navigation.setOptions({
    headerTitleStyle: {fontWeight: "bold"},headerLeft: (props)=>(<Ionicons name="close-outline" size={40} style={{marginLeft: 15}} onPress={()=>this.props.navigation.goBack()
}/>),headerRight: ()=>(<View style={{marginRight: 10}}><Button title={"Next"} onPress={()=>this.props.navigation.navigate("Publish Post",{image: this.state.selected,user: this.props.route.params.user})} /></View>),gestureEnabled: false
  })
    this.getGallery()
  }

  getGallery=async()=>{
    const permission=await MediaLibrary.requestPermissionsAsync()
    if(permission.status){
    const photos=await MediaLibrary.getAssetsAsync()
    this.setState({images: photos.assets,selected: photos.assets[0]})}

  }

  render(){
  return (
    <View style={{flex: 1}}>
    <Image resizeMode={"cover"} source={{uri: this.state.selected.uri}} style={{width: "100%",height: "60%"}}/>
    <FlatList
    keyExtractor={(item)=>item.id}
    numColumns={4}
    data={this.state.images}
    style={{paddingBottom: 40}}
    renderItem={({item})=>
    <TouchableOpacity style={{flex: 1,flexDirection: 'row'}} onPress={()=>this.setState({selected: item})}>
    <Image source={{uri: item.uri}} style={{width: "100%",height: 110,borderWidth: 0.3,borderColor: "white"}}/>
    </TouchableOpacity>
    }
    />
    </View>
  )}
}
