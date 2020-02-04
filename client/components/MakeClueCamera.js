// // https://snack.expo.io/@charliecruzan/camerja  <--- Resource for camera info and largely where we sourced our code from

import React, {Component} from 'react';
import * as Permissions from 'expo-permissions';
import {Camera} from 'expo-camera';
import {View, TouchableOpacity, Image, Text} from 'react-native';
import {MaterialCommunityIcons, Ionicons} from '@expo/vector-icons';
import axios from 'axios';
import findCoordinates from './Gps';
import ngrokUrl from '../ngrok';

//make a gallery
//how do you get the image from a snapshot
// https://stackoverflow.com/questions/42521679/how-can-i-upload-a-photo-with-expo

export default class CameraComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      photo: {},
      id: 0,
      position: {}
    };
    this.upload = this.upload.bind(this);
    this.snapPhoto = this.snapPhoto.bind(this);
  }

  async componentDidMount() {
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
    findCoordinates(position => this.setState({position}));
    // console.log(this.props);
  }

  async snapPhoto() {
    if (this.camera) {
      const options = {
        quality: 1,
        base64: true,
        fixOrientation: true,
        exif: true
      };
      //const photo = photo.uri
      await this.camera.takePictureAsync(options).then(photo => {
        photo.exif.Orientation = 1;
        this.setState({
          photo: photo,
          id: ++this.state.id
        });
      });
      this.upload(this.state.photo.base64); //photo.uri
      await findCoordinates(position => this.setState({position}));
      // console.log('position in location function', this.state.position);
      // console.log(this.state.position);
    }
    // let photo = this.state.photo.uri;
    // let id = this.state.id;
  }

  async upload(picBase64) {
    // console.log('upload state position', this.state.position);
    const serverUrl = 'https://api.cloudinary.com/v1_1/basic-merv/image/upload';
    const data = picBase64;
    let formData = new FormData();
    formData.append('file', 'data:image/png;base64,' + data);
    formData.append('upload_preset', 'jb7k5twx');
    // console.log('upload recording to ' + serverUrl);
    //building a network request that has the raw data
    //smaller file size to start with (photo.uri)
    //changing upload strategy is a last resort
    //instead of the formData, create an analogous object (get photo,
    //pull URI, construct & submit obj)
    try {
      const res = await axios.post(serverUrl, formData);
      const startIdx = res.request._response.indexOf(':') + 2;
      const endIdx = res.request._response.indexOf(',') - 1;
      const publicId = res.request._response.slice(startIdx, endIdx);
      const imageUrl = `https://res.cloudinary.com/basic-merv/image/upload/v1580414724/${publicId}.jpg`;
      const {data} = await axios.post(
        `https://${ngrokUrl}.ngrok.io/api/images`,
        {
          url: imageUrl,
          position: this.state.position,
          compare: false
        }
      );
      console.log('data', data);
      this.props.data(data);
    } catch (err) {
      console.error(err);
    }
  }

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
                this.upload(this.state.photo.base64);
              }}
            >
              <Ionicons color="white" size={64} name="ios-reverse-camera" />
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={this.snapPhoto.bind(this)}
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
        {this.state.photo.base64 ? (
          <Image
            style={{width: 50, height: 50}}
            source={{uri: `data:image/png;base64,${this.state.photo.base64}`}}
          />
        ) : (
          <Text>You were wrong.</Text>
        )}
      </View>
    );
  }
}
