import * as React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Button,
  StyleSheet,
  ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';


export default class ProfileScreen extends React.PureComponent {
  state = {
    imageFile: "",
    user: '',
    image: 'https://firebasestorage.googleapis.com/v0/b/instagram-clone-41664.appspot.com/o/images%2F25DE3775-DA06-495D-B69A-05E045A9AE41?alt=media&token=776a262d-7970-4ce1-ae61-f2af66df2d40',
  };

  componentDidMount() {
   this.getUserData();
  }

  getUserData = async () => {
    const token = await AsyncStorage.getItem('token')
    fetch('http://192.168.66.146:5000/currentUser',{
      headers:new Headers({
          Authorization:"Bearer "+token
      })
  }).then(
      res=>res.json())
    .then((data)=>this.setState({user: data,image: "http://10.113.60.241:5000/upload/"+data.imageUri}))
    .catch(err=>console.log(err))
  };

  uploadPhoto = () => {
    const data = new FormData();
    data.append('_id', this.state.user._id)
    data.append('imageUri', this.state.imageFile)
    fetch('http://10.113.60.241:5000/changeProfile',{
        method: "POST",
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        body: data
    }).then(
        ()=>console.log("Profile photo updated!")
    ).catch(err=>console.log(err))
  };

  changePhoto = async () => {
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
      name: this.state.user.imageUri,
      type: blob['_data'].type
    }
    this.setState({image: file.uri,imageFile: file})
    this.uploadPhoto()
    } catch (err) {
      console.log(err);
    }

  };

  signout =async () => {
    try {
        await AsyncStorage.removeItem('token')
        this.props.navigation.replace("Auth")
      } catch (e) {
        console.log(e)
      }  
  };

  render() {
    return (
      <ScrollView style={{ backgroundColor: "white",flex: 1}}>
        <Image source={{ uri: this.state.image }} style={styles.image} />
        <TouchableOpacity style={{alignSelf: "center",marginVertical: 14}} onPress={() => this.changePhoto()} ><Text style={{color: "#2a9df4",fontWeight: "bold"}}>Change Profile Photo</Text></TouchableOpacity>
        <View style={{borderTopWidth: 1,borderColor: "#EBECF0",borderBottomWidth: 1,padding: 10}}>
        <View style={styles.textContainer}>
         <Text style={styles.heading}>Name</Text>
         <View style={{width: '78%',marginLeft: "14%",height: '100%',borderBottomColor: "#EBECF0",borderBottomWidth: 1}}>
         <Text style={styles.text}>{this.state.user.name}</Text>
         </View>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.heading}>Email</Text>
          <View style={{width: '78%',marginLeft: "14%",height: '100%',borderBottomColor: "#EBECF0",borderBottomWidth: 1}}>
          <Text style={styles.text}>{this.state.user.email}</Text>
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.heading}>Website</Text>
          <View style={{width: '78%',marginLeft: "10%",height: '100%',borderBottomColor: "#EBECF0",borderBottomWidth: 1}}>
          <Text style={styles.text}></Text>
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.heading}>Bio</Text>
          <View style={{width: '78%',marginLeft: "18%"}}>
          <Text style={styles.text}>Just a traveller wandering around the world !</Text>
          </View>
        </View>
        </View>
        <TouchableOpacity style={{marginVertical: 14,marginLeft: 10}} onPress={() => this.changePhoto()} ><Text style={{color: "#2a9df4",fontWeight: "500",fontSize: 15}}>Personal Information Settings</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => this.signout()} style={styles.button}>
          <Text style={{ fontSize: 18 }}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    padding: 5,
  },
  heading: {
    fontWeight: "500",
    paddingBottom: 5
  },
  textContainer: {
    margin: 15,
    marginLeft: 5,
    flexDirection: "row",
    alignItems: 'center'
  },
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
  },
  image: {
    height: "16%",
    aspectRatio: 1,
    marginTop: 15,
    alignSelf: 'center',
    borderRadius: 75,
  },
});