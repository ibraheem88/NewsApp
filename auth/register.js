import * as React from 'react';
import {View,Text,StyleSheet,KeyboardAvoidingView,TextInput,TouchableOpacity,Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

export default class Register extends React.Component{

  state = {
    email: '',
    password: '',
    name: '',
    image: '',
    id: ''
  };


  handleEmail = (email) => {
      this.setState({ email });
  };
   handlePassword = (password) => {
      this.setState({ password });
  };
  handleName = (name) => {
    this.setState({ name });
  };

  register = async() => {
    const data = new FormData();
    data.append('name', this.state.name)
    data.append('email', this.state.email)
    data.append('password', this.state.password)
    data.append('imageUri', this.state.image)
    fetch('http://10.113.60.241:5000/signup',{
        method: "POST",
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        body: data
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

  addPhoto=async() => {
    const permissions=await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (permissions.status !== 'granted') {
      alert('Permission for gallery not granted!');
      return;
    }
    try{
    const result =await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.1,
    })
    const response=await fetch(result.uri)
    const blob=await response.blob()
    const file = {
      uri: result.uri,
      name: blob['_data'].name,
      type: blob['_data'].type
    }
    this.setState({image: file})
  }catch(err){
    console.log(err)
  }
  }

  render() {
    return (
      <View style={{backgroundColor: "white",flex: 1}}>
      <View style={{alignItems: "center",marginTop:20}}>
       <Text style={{color: "grey",fontSize: 30}}>Register</Text>
      </View>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <TextInput
          value={this.state.name}
          placeholder={"Name"}
          style={styles.input}
          onChangeText={this.handleName}
        />
        <TextInput
          value={this.state.email}
          placeholder={"Email"}
          style={styles.input}
          onChangeText={this.handleEmail}
        />
        <TextInput
          value={this.state.password}
          placeholder={"Password"}
          style={styles.input}
          secureTextEntry={true}
          onChangeText={this.handlePassword}
        />
        <TouchableOpacity
          style={{width: '50%',
              backgroundColor: "black",
              borderWidth: 1,
              justifyContent: "center",
              margin: 5,
              borderRadius: 25,
              height: '15%',
              marginTop: 35}}
          onPress={()=> this.addPhoto()}>
          <Text style={styles.btnText}>Add Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
          onPress={this.register} >
        <Text style={styles.btnText}>Register</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles=StyleSheet.create({
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
},
  container: {
    padding: 20,
    justifyContent: 'center',
  },

})