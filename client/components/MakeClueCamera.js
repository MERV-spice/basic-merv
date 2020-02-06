// // https://snack.expo.io/@charliecruzan/camerja  <--- Resource for camera info and largely where we sourced our code from

import React, {Component} from 'react';
import * as Permissions from 'expo-permissions';
import {Camera} from 'expo-camera';
import {View, TouchableOpacity, Image, Text} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import axios from 'axios';
import {findCoordinates} from '../helperFunctions';
import url from '../ngrok';

//make a gallery
//how do you get the image from a snapshot
// https://stackoverflow.com/questions/42521679/how-can-i-upload-a-photo-with-expo

export default class CameraComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: Camera.Constants.Type.back
    };
    this.position = {};
    this.upload = this.upload.bind(this);
    this.snapPhoto = this.snapPhoto.bind(this);
  }

  async componentDidMount() {
    await Permissions.askAsync(Permissions.CAMERA);
    findCoordinates(position => (this.position = position));
  }

  async snapPhoto() {
    if (this.camera) {
      const options = {
        quality: 0.25,
        base64: true,
        fixOrientation: true,
        exif: true
      };
      const photo = await this.camera.takePictureAsync(options);
      photo.exif.Orientation = 1;
      this.upload(photo.base64);
    }
  }

  async upload(picBase64) {
    const serverUrl = 'https://api.cloudinary.com/v1_1/basic-merv/image/upload';
    const data = picBase64;
    let formData = new FormData();
    formData.append('file', 'data:image/png;base64,' + data);
    formData.append('upload_preset', 'jb7k5twx');
    //building a network request that has the raw data
    //smaller file size to start with (photo.uri)
    //changing upload strategy is a last resort
    //instead of the formData, create an analogous object (get photo,
    //pull URI, construct & submit obj)
    try {
      const res = await axios.post(serverUrl, formData);
      const publicId = JSON.parse(res.request._response).public_id;
      const imageUrl = `https://res.cloudinary.com/basic-merv/image/upload/v1580414724/${publicId}.jpg`;
      const {data} = await axios.post(`${url}/api/images`, {
        url: imageUrl,
        position: this.state.position,
        compare: false
      });
      this.props.navigation.state.params.fn(data);
    } catch (err) {
      console.error(err);
    }
  }
  pressHandler = () => {
    this.snapPhoto();
    this.props.navigation.navigate('MakeGame');
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <Camera
          style={{flex: 1}}
          ref={ref => {
            this.camera = ref;
          }}
          type={this.state.type}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row'
            }}
          >
            {/* <TouchableOpacity
              style={{
                flex: 0.3,
                alignSelf: 'flex-end',
                alignItems: 'center',
              }}
              onPress={() => {
                this.setState({
                  type:
                    this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                });
              }}
            >
              <Ionicons color="white" size={64} name="ios-reverse-camera" />
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={this.pressHandler}
              style={{
                alignSelf: 'flex-end',
                alignItems: 'center',
                marginLeft: 100
              }}
            >
              <MaterialCommunityIcons
                name="circle-slice-8"
                size={64}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
  }
}
