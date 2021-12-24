import * as React from 'react';
import { Text,FlatList,TouchableOpacity,StyleSheet,RefreshControl,Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import Post from "../newsFeedComponents/post"


export default class Home extends React.Component {

  getHeader = () => {
    return (    <TouchableOpacity
      style={{width: 100,
          backgroundColor: "black",
          borderWidth: 1,
          justifyContent: "center",
          alignSelf: "center",
          margin: 5,
          borderRadius: 20,
          height: 50,
          marginTop: 35}}
          onPress={()=>this.props.navigation.navigate("Add Post",{user: this.state.user})}
      >
      <Text style={styles.btnText}>Add Photo</Text>
  </TouchableOpacity>)
  };

  state = {
    user: {},
    posts: [],
    refreshing: false
  }; 

  refresh=()=>{
    this.setState({refreshing: true})
    this.getPosts().then(() => {
      this.setState({refreshing: false});
    });
}



componentDidMount = () => {
    this.getData()
    this.getPosts()  
  }

  registerForPushNotificationsAsync=async()=> {
    let token
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        console.log('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      fetch('http://10.113.60.241:5000/updateToken',{
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          "id": this.state.user._id,
          token: token
        })
      }).then(
        res=>res.json())
      .then((data)=>{
        if(data)this.setState({lastMessage: data})}
        )
      .catch(err=>console.log(err))
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        sound: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }

  getPosts=async ()=>{
        fetch('http://10.113.60.241:5000/posts').then(
          res=>res.json())
        .then((data)=>{
          if(data)this.setState({posts: data.reverse()})}
          )
        .catch(err=>console.log(err))
  }

getData=async()=>{
  const token = await AsyncStorage.getItem('token')
  fetch('http://10.113.60.241:5000/currentUser',{
    headers:new Headers({
        Authorization:"Bearer "+token
    })
}).then(
    res=>res.json())
  .then((data)=>{this.setState({user: data})
  this.registerForPushNotificationsAsync()
})
  .catch(err=>console.log(err))
}

  render(){
  return (
    <FlatList
      refreshControl={
          <RefreshControl refreshing={this.state
          .refreshing} onRefresh={()=>this.refresh()} />
        }
    style={{backgroundColor: "white"}}
    data={this.state.posts}
    keyExtractor={(item)=>item._id}
    renderItem={({item})=>
    <Post post={item}/>
    }
    ListHeaderComponent={this.getHeader()}
    />
  )}
}

const styles=StyleSheet.create({
    input: {
    borderRadius: 25,
    fontSize: 15,
    borderWidth: 1,
    margin: 5,
    padding: 15,
  },
  button:{
    backgroundColor: "black",
    marginTop: 20,
    borderRadius: 25,
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