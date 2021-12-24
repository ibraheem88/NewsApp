import * as React from 'react';
import { Text, View, Image, ScrollView, TextInput, Button } from 'react-native';
import uuid from 'react-native-uuid';


export default class PublishScreen extends React.Component {
  state = {
    image: this.props.route.params.image.uri,
    imageFile: {},
    text: '',
  };

  handleText = (text) => {
    this.setState({ text });
  };

  componentDidMount() {
    this.props.navigation.setOptions({
      headerTitleStyle: { fontWeight: 'bold' },
      headerRight: (props) => (
        <View style={{ marginRight: 10 }}>
          <Button title="Share" color="blue" onPress={() => this.post()} />
        </View>
      ),
    });
    this.getBlob()
  }

  getBlob=async ()=>{
    const response=await fetch(this.props.route.params.image.uri)
    const blob=await response.blob()
    const type=blob['_data'].type
    const typef=type.replace('image/','')
    const file = {
      uri: this.props.route.params.image.uri,
      name: uuid.v4()+'.'+typef,
      type: blob['_data'].type
    }
    this.setState({ imageFile: file });
  }

  post = async () => {
    const data = new FormData();
    data.append('text', this.state.text)
    data.append('authorName', this.props.route.params.user.name)
    data.append('authorImage', this.props.route.params.user.imageUri)
    data.append('postedBy', this.props.route.params.user._id)
    data.append('image', this.state.imageFile)
    fetch('http://10.113.60.241:5000/newPost',{
        method: "POST",
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        body: data
    }).then(
        this.props.navigation.navigate('Home')
    ).catch(err=>console.log(err))
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View
          style={{
            flexDirection: 'row',
            height: 100,
            borderBottomColor: 'lightgrey',
            borderBottomWidth: 1,
            padding: 16,
          }}>
          <Image
            source={{ uri: this.state.image }}
            style={{ width: 65, height: 65 }}
          />
          <TextInput
            placeholder="Write a caption..."
            placeholderTextColor="grey"
            style={{
              marginLeft: 10,
              width: '80%',
              height: '100%',
              paddingBottom: 40,
              fontSize: 15,
              color: 'black',
            }}
            onChangeText={this.handleText}
            value={this.state.text}
          />
        </View>
        <View
          style={{
            padding: 20,
            borderBottomColor: 'lightgrey',
            borderBottomWidth: 1,
          }}>
          <Text style={{ fontSize: 15, fontWeight: '500' }}>Tag People</Text>
        </View>
        <View
          style={{
            padding: 20,
            borderBottomColor: 'lightgrey',
            borderBottomWidth: 1,
          }}>
          <Text style={{ fontSize: 15, fontWeight: '500' }}>Add Location</Text>
        </View>
        <View
          style={{
            padding: 20,
            borderBottomColor: 'lightgrey',
            borderBottomWidth: 1,
          }}>
          <Text style={{ fontSize: 15, fontWeight: '500' }}>
            Post to Other Accounts
          </Text>
        </View>
      </View>
    );
  }
}