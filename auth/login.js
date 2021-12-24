import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput, View, StyleSheet, ScrollView, Button ,Text,ActivityIndicator,TouchableOpacity,Image} from 'react-native';
import {Ionicons} from '@expo/vector-icons'


export default class Login extends React.Component {

  state = {
    username: '',
    password: '',
  };

componentDidMount(){
    this.checktoken()
}

checktoken=async()=>{
  const token = await AsyncStorage.getItem('token')
  if(token){
    this.props.navigation.replace('MainTabs')
  }
}

  handleUsername = (username) => {
    this.setState({ username });
  };

   handlePassword = (password) => {
    this.setState({password})
  };

  login=()=>{
    fetch('http://10.113.60.241:5000/signin',{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email": this.state.username,
            "password": this.state.password
        })
    }).then(
        res=>res.json()
    ).then(async data=>{
        try {
            await AsyncStorage.setItem('token', data.token)
            this.props.navigation.replace('MainTabs')
          } catch (e) {
            console.log(e)
          }
    }).catch(err=>console.log(err))
  }

  render() {
    return (
      <View style={{backgroundColor: "white",flex: 1}}>
      <View style={{alignItems: "center",marginTop:20}}>
       <Ionicons name="log-in-outline" size={65} color={"grey"} />
       <Text style={{color: "grey",fontSize: 40}}>Login</Text>
      </View>

       <View style={styles.row}>
      
        <TextInput
          style={styles.input}
          value={this.state.username}
          onChangeText={this.handleUsername}
        />
        <TextInput
          style={styles.input}
          value={this.state.password}
          onChangeText={this.handlePassword}
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={this.login }
        ><Text style={styles.btnText}>Log In</Text></TouchableOpacity>
        <View style={{flexDirection: "row",margin: 25,alignItems: "center"}}>
        <Text>Donot have an account?</Text>
         <TouchableOpacity style={{marginLeft: 15}} onPress={()=>this.props.navigation.navigate("Register") }>
          <Text style={{color: "grey",fontSize: 20}}>Register</Text> 
        </TouchableOpacity>
        </View>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    borderRadius: 12,
    fontSize: 15,
    borderWidth: 1,
    margin: 5,
    padding: 15,
  },
  button:{
    backgroundColor: "black",
    marginTop: 20,
    borderRadius: 12,
    fontSize: 20,
    borderWidth: 1,
    margin: 5,
    padding: 10,
    shadowColor: "black"
},
btnText:{
  color: "white",
  textAlign: "center"
}
});