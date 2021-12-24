import * as React from 'react';
import { Text, View,Image,ScrollView } from 'react-native';
import ProfilePhoto from "./profilePhoto"
import {Ionicons} from "react-native-vector-icons"


export default function Header({post}) {
  return (
      <View style={{flexDirection: "row",alignItems: 'center',marginLeft: 10}}>
      <ProfilePhoto uri={post.authorImage} size={30}/>
      <Text style={{fontWeight: "600",fontSize: 13}}>{post.authorName}</Text>
      <View style={{alignItems: 'flex-end',flex: 1}}>
      <Ionicons name="ellipsis-horizontal" size={22} style={{marginRight: 10}} />
      </View>
      </View>
  );
}