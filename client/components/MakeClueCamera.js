// // https://snack.expo.io/@charliecruzan/camerja  <--- Resource for camera

import React, {Component} from 'react';
import * as Permissions from 'expo-permissions';
import {Camera} from 'expo-camera';
import {View, TouchableOpacity} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import axios from 'axios';
import {findCoordinates} from '../helperFunctions';
import url from '../ngrok';

//accessing image from a snapshot (/gallery)
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
    this.pressHandler = this.pressHandler.bind(this);
  }

  async componentDidMount() {
    await Permissions.askAsync(Permissions.CAMERA);
    findCoordinates(position => {
      this.position = position;
    });
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
    const imageData = picBase64;
    let formData = new FormData();
    formData.append('file', 'data:image/png;base64,' + imageData);
    formData.append('upload_preset', 'jb7k5twx');
    try {
      const res = await axios.post(serverUrl, formData);
      const publicId = JSON.parse(res.request._response).public_id;
      const imageUrl = `https://res.cloudinary.com/basic-merv/image/upload/v1580414724/${publicId}.jpg`;
      const {data} = await axios.post(`${url}/api/images`, {
        url: imageUrl,
        position: this.position,
        compare: false
      });
      this.props.navigation.state.params.fn(data); //
    } catch (err) {
      console.error(err);
    }
  }
  pressHandler = () => {
    console.log(this.props);
    this.snapPhoto();
    this.props.navigation.navigate('MakeGame');
    this.props.navigation.state.params.toggleOverlay();
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
            {/* If we decide to make a reverse camera button on make clue camera */}
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
              onPress={this.pressHandler.bind(this)} //
              style={{
                alignSelf: 'flex-end',
                marginLeft: 175
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
