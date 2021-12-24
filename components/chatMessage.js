import React from 'react'
import {View,Text,Image} from 'react-native'
import moment from 'moment'
import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing'
import { Ionicons, Entypo} from '@expo/vector-icons';


export default class ChatMessage extends React.Component{

    state={
        sender: "",
        image: 'https://lh3.googleusercontent.com/proxy/n8DBYcGSsu1kooWk6BV00MQXpl7scmyvwlIDsgzcP72YADw8R5GW0RI-zgCTu3e19LrunYEk73uWA86YjeHNv0MVIg',
        document: undefined
    }

    isMyMessage=()=>{
        return this.props.currentUser===this.props.message.sentBy
    }

    render(){
    return(
        <View style={{ padding: 10, paddingHorizontal: 16 }}>
        {this.props.message.type != 'text' ? (
          <View
            style={[
              { paddingHorizontal: 4,paddingVertical: 3, borderRadius: 5 },
              this.isMyMessage()
                ? {
                    backgroundColor: '#DCF8C5',
                    alignSelf: 'flex-end',
                    marginLeft: 60,
                  }
                : {
                    backgroundColor: 'white',
                    marginRight: 60,
                    alignSelf: 'flex-start',
                  },
            ]}>
            {!this.isMyMessage() && (
              <Text style={{ color: 'lightgreen', fontWeight: 'bold' }}>
                {this.props.message.sentBy}
              </Text>
            )}
            {this.props.message.type==='image' ?
              <Image
              source={{uri: "http://10.113.60.241:5000/upload/messages/"+this.props.message.image}}
              style={{ width: 280, height: 280,marginVertical: 2 }}
            /> :
              <View style={{flexDirection: "row",marginTop: 7,alignItems: "center"}}>
              <Ionicons
              name="document-text-outline"
              size={24}
              color="black"/>
              <Text style={{ marginTop: 5,marginHorizontal: 5 }}>{this.props.message.name}</Text>
              {this.state.document &&
              (<Ionicons
              name="download-outline"
              onPress={()=>this.downloadDocument()}
              size={24}
              color="blue"/>)
              }
              </View>
            }
            <Text style={{fontSize: 14 }}>
            {this.props.message.message}
            </Text>
            <Text style={{ alignSelf: 'flex-end', color: 'grey',fontSize: 14 }}>
              {moment(this.props.message.createdAt).fromNow()}
            </Text>
          </View>
        ) : (
          <View
            style={[
              { padding: 8,paddingVertical: 5, borderRadius: 5 },
              this.isMyMessage()
                ? {
                    backgroundColor: '#DCF8C5',
                    alignSelf: 'flex-end',
                    marginLeft: 60,
                  }
                : {
                    backgroundColor: 'white',
                    marginRight: 60,
                    alignSelf: 'flex-start',
                  },
            ]}>
            {!this.isMyMessage() && (
              <Text style={{ color: 'lightgreen', fontWeight: 'bold' }}>
                {this.props.message.sentBy}
              </Text>
            )}
              <Text style={{ marginTop: 5 }}>{this.props.message.message}</Text>
            <Text style={{ alignSelf: 'flex-end', color: 'grey',fontSize: 14 }}>
              {moment(this.props.message.createdAt).fromNow()}
            </Text>
          </View>
        )}
      </View>
    
    )
    }
}