// // https://snack.expo.io/@charliecruzan/camerja  <--- Resource for camera info and largely where we sourced our code from

import React, { Component } from 'react';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import axios from 'axios';

//make a gallery
//how do you get the image from a snapshot
// https://stackoverflow.com/questions/42521679/how-can-i-upload-a-photo-with-expo

export default class CameraComp extends Component {
  constructor() {
    super();
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      photo: '',
      id: 0,
    };
    this.upload = this.upload.bind(this);
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  async snapPhoto() {
    if (this.camera) {
      const options = {
        quality: 1,
        base64: true,
        fixOrientation: true,
        exif: true,
      };
      await this.camera.takePictureAsync(options).then(photo => {
        photo.exif.Orientation = 1;
        this.setState({
          photo: photo,
          id: ++this.state.id,
        });
      });
      this.upload(this.state.photo.base64);
    }
    let photo = this.state.photo.uri;
    let id = this.state.id;
  }

  upload(picBase64) {
    console.log('in upload');
    const serverUrl = 'https://api.cloudinary.com/v1_1/basic-merv/image/upload';
    const data = picBase64;
    let formData = new FormData();
    formData.append('file', 'data:image/png;base64,' + data);
    formData.append('upload_preset', 'jb7k5twx');
    console.log('upload recording to ' + serverUrl);

    axios({
      url: serverUrl,
      method: 'POST',
      data: formData,
    })
      .then(function(res) {
        const startIdx = res.request._response.indexOf(':') + 2;
        const endIdx = res.request._response.indexOf(',') - 1;
        const publicId = res.request._response.slice(startIdx, endIdx);
        // THIS IS IMPORTANT!!!
        console.log(
          'public url to fetch image',
          `https://res.cloudinary.com/basic-merv/image/upload/v1580414724/${publicId}.jpg`
        );
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Camera
          style={{ flex: 1 }}
          ref={ref => {
            this.camera = ref;
          }}
          type={this.state.type}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row',
            }}
          >
            <TouchableOpacity
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
                this.upload(this.state.photo.base64);
              }}
            >
              <Ionicons color="white" size={64} name="ios-reverse-camera" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.snapPhoto.bind(this)}
              style={{
                alignSelf: 'flex-end',
                alignItems: 'center',
                marginLeft: 60,
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
        {this.state.photo.base64 ? (
          <Image
            style={{ width: 50, height: 50 }}
            source={{ uri: `data:image/png;base64,${this.state.photo.base64}` }}
          />
        ) : (
          <Text>You were wrong.</Text>
        )}
      </View>
    );
  }
}
