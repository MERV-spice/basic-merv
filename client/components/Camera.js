// // https://snack.expo.io/@charliecruzan/camerja  <--- Resource for camera info and largely where we sourced our code from

import React , {Component} from 'react'
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { View, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

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
            id: 0
        }
    }

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
        // console.log('this.camera', this.camera)
    }

    async snapPhoto() {       
        // console.log('Button Pressed');
        if (this.camera) {
            // console.log('Taking photo');
            const options = { quality: 1, base64: true, fixOrientation: true, 
            exif: true};
            await this.camera.takePictureAsync(options).then(photo => {
                photo.exif.Orientation = 1;            
                this.setState({
                    photo: photo,
                    id: ++this.state.id
                });
            });
        }
        let photo = this.state.photo.uri;
        let id = this.state.id;
    }

    render() {
        // console.log('pix', this.state.photo)
        return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} ref={(ref) => {this.camera = ref}} type={this.state.type}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: .3,
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
                }}>
                <Ionicons color="white" size={64} name="ios-reverse-camera"/>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.snapPhoto.bind(this)}
                style={{
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                    marginLeft: 60
                  }}
                >
                    <MaterialCommunityIcons name="circle-slice-8" size={64} color="white" />
                </TouchableOpacity>
            </View>
          </Camera>
        </View>
        )
    }
}
