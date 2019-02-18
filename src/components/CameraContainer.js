import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Expo from 'expo';
import { Camera, Permissions } from 'expo';
import isIPhoneX from 'react-native-is-iphonex';
import { 
  FontAwesome,
  Ionicons,
  MaterialIcons,
  Foundation,
  MaterialCommunityIcons,
  Octicons
} from '@expo/vector-icons';
export default class MainScreen extends React.Component {

	onPressClose = () => {
		this.props.close();
	}

	state = {
	    hasCameraPermission: null,
	    type: Camera.Constants.Type.back,
	  };

	componentDidMount () {
		Expo.FileSystem.makeDirectoryAsync(Expo.FileSystem.documentDirectory + 'photos').catch(e => {
	      console.log(e, 'Directory exists');
	    });
	}

	renderTopExit = () =>
    <View
      style={{flex: .1}}>
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={this.onPressClose}
          style={{ alignSelf: 'flex-end', padding:12 }}
        >
          <Ionicons name="md-close" size={40} color="gray" />
        </TouchableOpacity>
      </View> 
    </View>

	takeUpSpace = () =>
	<View
	  style={{flex:.78}}>
	  {null}
	</View>

	renderBottomBar = () =>
	<View
	  style={styles.bottomBar}>
	  <View style={{ flex: 1 }}>
	    <TouchableOpacity
	      onPress={this.takePicture}
	      style={{ alignSelf: 'center' }}
	    >
	      <Ionicons name="ios-radio-button-on" size={70} color="white" />
	    </TouchableOpacity>
	  </View> 
	</View>

	takePicture = () => {
		if (this.camera) {
		  this.camera.takePictureAsync({ onPictureSaved: this.onPictureSaved });
		}
	};

	handleMountError = ({ message }) => console.error(message);

	onPictureSaved = async photo => {
		let saveLocation = `${Expo.FileSystem.documentDirectory}photos/${Date.now()}.jpg`;
		await Expo.FileSystem.moveAsync({
			from: photo.uri,
			to: saveLocation,
		});
		this.props.pictureSavedCallback(saveLocation);
		let x = Expo.FileSystem.readDirectoryAsync(Expo.FileSystem.documentDirectory+'photos/');
		x.then(info => console.log(info));
	}

	render() {
		return (
			<Camera
	          ref={ref => {
	            this.camera = ref;
	          }}
	          style={styles.camera}
	          >
	          {this.renderTopExit()}
	          {this.takeUpSpace()}
	          {this.renderBottomBar()}
	        </Camera>
		);
	}
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    justifyContent: 'space-between',
  },
  bottomBar: {
    paddingBottom: isIPhoneX ? 25 : 5,
    backgroundColor: 'transparent',
    alignSelf: 'flex-end',
    justifyContent: 'space-between',
    flex: 0.12,
    flexDirection: 'row',
  },
});