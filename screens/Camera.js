// // https://snack.expo.io/@charliecruzan/camerja  <--- Resource for camera info and largely where we sourced our code from

import React, {Component} from 'react';
import * as Permissions from 'expo-permissions';
import {Camera} from 'expo-camera';
import {View, TouchableOpacity, Image, Text, Button} from 'react-native';
import {MaterialCommunityIcons, Ionicons} from '@expo/vector-icons';
import axios from 'axios';

import {compare} from '../server/clarifai/compare';

import findCoordinates from './Gps';
import url from '../client/ngrok';

//make a gallery
//how do you get the image from a snapshot
// https://stackoverflow.com/questions/42521679/how-can-i-upload-a-photo-with-expo

export default class CameraComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: Camera.Constants.Type.back
    };
    this.snapPhoto = this.snapPhoto.bind(this);
    this.position = {};
  }

  pressHandler = () => {
    this.props.navigation.navigate('CluePage');
  };

  async componentDidMount() {
    await Permissions.askAsync(Permissions.CAMERA);
    findCoordinates(position => (this.position = position));
  }

  async snapPhoto() {
    if (this.camera) {
      const {id, setScore} = this.props.navigation.state.params;
      const options = {
        quality: 0.25,
        base64: true,
        fixOrientation: true,
        exif: true
      };

      const photo = await this.camera.takePictureAsync(options);
      photo.exif.Orientation = 1;
      await findCoordinates(position => (this.position = position));
      console.log(compare);
      const comparison = await compare(photo.base64, id);
      console.log('comp', comparison);
      setScore(comparison);
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
      </View>
    );
  }
}
