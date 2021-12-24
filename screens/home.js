import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, StyleSheet,Text,TouchableOpacity, Image} from 'react-native';


export default class Home extends React.Component {

  state={
    name: "",
    image: "https://i.stack.imgur.com/l60Hf.png"
  }

  getToken=async()=>{
    const token = await AsyncStorage.getItem('token')
    fetch('http://10.113.60.241/currentUser',{
      headers:new Headers({
          Authorization:"Bearer "+token
      })
  }).then(
      res=>res.json())
    .then((data)=>this.setState({name: data.name,image: "http://10.113.60.241:5000/upload/"+data.imageUri}))
    .catch(err=>console.log(err))
  }

  componentDidMount(){
    this.getToken()
  }

  signout = async () => {
    try {
      await AsyncStorage.removeItem('token')
      this.props.navigation.replace("Auth")
    } catch (e) {
      console.log(e)
    }
  };

  render() {
    return (
      <View style={{backgroundColor: "white",padding: 10,flex:1}}>
          <Text style={{color: "black",fontSize:30}}>Welcome {this.state.name}</Text>
          <Image source={{uri:this.state.image}} style={{width:100,height: 100,borderRadius: 50}}/>
          <TouchableOpacity onPress={() => this.signout()} style={styles.button}>
          <Text style={{ fontSize: 18 }}>Log Out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    padding: 10,
    alignItems: 'center',
    width: '50%',
    borderColor: "black",
    borderWidth: 1,
    alignSelf: 'center',
    borderRadius: 2,
    marginVertical: 20
  }
});