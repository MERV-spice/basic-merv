// // https://snack.expo.io/@charliecruzan/camerja  <--- Resource for camera info and largely where we sourced our code from

import React, {Component} from 'react';
import * as Permissions from 'expo-permissions';
import {Camera} from 'expo-camera';
import {View, TouchableOpacity, Image, Text, Button} from 'react-native';
import {MaterialCommunityIcons, Ionicons} from '@expo/vector-icons';
import axios from 'axios';

import compare from '../server/clarifai/compare';

import findCoordinates from './Gps';
import url from '../client/ngrok';

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
      id: 0
    };
    this.snapPhoto = this.snapPhoto.bind(this);
    this.position = {};
  }

  pressHandler = () => {
    this.props.navigation.navigate('CluePage');
  };

  async componentDidMount() {
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
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
      await findCoordinates(position => (this.position = position));

      const comparison = await compare(photo.base64);
      const id = 'sky';
      let comp;
      for (let i = 0; i < comparison.hits.length; i++) {
        if (comparison.hits[i].input.id === id) {
          comp = comparison.hits[i].score;
          break;
        }
      }
      console.log(comp);
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Button title="go to clue" onPress={this.pressHandler} />
        <Camera
          style={{flex: 1}}
          ref={ref => (this.camera = ref)}
          type={this.state.type}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row'
            }}
          >
            <TouchableOpacity
              style={{
                flex: 0.3,
                alignSelf: 'flex-end',
                alignItems: 'center'
              }}
              onPress={() =>
                this.setState({
                  type:
                    this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                })
              }
            >
              <Ionicons color="white" size={64} name="ios-reverse-camera" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.snapPhoto.bind(this)}
              style={{
                alignSelf: 'flex-end',
                alignItems: 'center',
                marginLeft: 60
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
