import * as React from 'react';
import { Text, View,Image } from 'react-native';


export default function ProfilePhoto({uri,size=65}) { 
  return (
    <View style={{borderWidth: 2,borderColor: "green",borderRadius: 44,alignItems: 'center',justifyContent: "center",margin: 8,width: size+8,height: size+8,marginLeft: 0}}>
    <Image source={{uri: "http://10.113.60.241:5000/upload/"+uri}} style={{width: size,height: size,borderRadius: 40}}/>
    </View>
  );
}

