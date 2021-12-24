import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import Home from '../screens/home'
import NewsFeedScreen from '../screens/newsFeedScreen'
import ChatScreen from '../screens/chatScreen';
import ProfileScreen from '../screens/profileScreen';
import ChatRoomScreen from '../screens/chatRoomScreen';
import SendImageScreen from '../screens/sendImageScreen'
import PublishScreen from '../newsFeedComponents/publishScreen';
import Login from './login'
import Register from "./register"
import AddPostScreen from '../newsFeedComponents/addPostScreen';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default class Auth extends React.Component{



AuthStack=()=>{
  return(
    <Stack.Navigator screenOptions={{}}>
    <Stack.Screen name={"Login"} component={Login}/>
    <Stack.Screen name={"Register"} component={Register}/>
    </Stack.Navigator>
  )
}

ChatStack=()=>{
  return(
    <Stack.Navigator screenOptions={{}}>
    <Stack.Screen name={"ChatScreen"} component={ChatScreen} options={{headerShown: false}}/>
    <Stack.Screen name={"ChatRoom"} component={ChatRoomScreen}/>
    <Stack.Screen name={"Send Image"} component={SendImageScreen} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}

HomeStack=()=>{
  return(
    <Stack.Navigator screenOptions={{}}>
    <Stack.Screen name={"Home"} component={NewsFeedScreen} options={{}}/>
    <Stack.Screen name={"Add Post"} component={AddPostScreen} options={{}}/>
    <Stack.Screen name={"Publish Post"} component={PublishScreen} options={{}}/>
    </Stack.Navigator>
  )
}

PostStack=()=>{
  return(
    <Stack.Navigator screenOptions={{}}>
    
    </Stack.Navigator>
  )
}

MainStack=()=>{
  return(
    <Stack.Navigator screenOptions={{}}>
    <Stack.Screen name={"Auth"} component={this.AuthStack} options={{headerShown: false}}/>   
    <Stack.Screen name={"MainTabs"} component={this.MainTabs} options={{headerShown: false}}/> 
    </Stack.Navigator>
  )
}

MainTabs=()=>{
  return (
    <Tab.Navigator screenOptions={{tabBarActiveTintColor: "black"}}>
      <Tab.Screen name="HomeTab" component={this.HomeStack} options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={focused ? 'newspaper' : 'newspaper-outline'}
                size={26}
                color="black"
              />
            );
          },
          title: "News Feed",
          headerShown: false
        }}/>
          <Tab.Screen name="Discussions" component={Home} options={{
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialCommunityIcons
                name={focused ? 'account-group' : 'account-group-outline'}
                size={26}
                color="black"
              />
            );
          }
        }}/>
        <Tab.Screen name="Chat" component={this.ChatStack} options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={focused ? 'chatbubbles' : 'chatbubbles-outline'}
                size={26}
                color="black"
              />
            );
          },
          headerShown: false
        }}/>
      <Tab.Screen name="Settings" component={ProfileScreen} options={({route})=>({
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={focused ? 'person-sharp' : 'person-outline'}
                size={26}
                color="black"
              />
            )
          }
        })}/>
    </Tab.Navigator>
  );
}

  render(){
  return(
    <NavigationContainer>
    <this.MainStack />
    </NavigationContainer>
  )}
}