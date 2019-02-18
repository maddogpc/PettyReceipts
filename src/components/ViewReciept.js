import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Button } from 'react-native'; 
import {Ionicons, FontAwesome} from '@expo/vector-icons';
const ViewReciept = props => {
	onPress = () => {
		props.removeReciept(props.id);
	}
	let groupHeader = [<Text key={0}>Groups: </Text>];
	let groups = props.groups.map((group, i) => {
		return <Text key={i+1}>{group}</Text>;
	});
	groupsWithHeader = groupHeader.concat(groups);

	let tagHeader = [<Text key={0}>Tags: </Text>];
	let tags = props.tags.map((tag, i) => {
		return <Text key={i+1}>{tag.name}: {tag.value}</Text>;
	});
	tagsWithHeader = tagHeader.concat(tags);

	const win = Dimensions.get('window');
	return (
		<View style={{flex:1, width: (win.width*.95)}}>
			<View style={viewRecieptStyles.menuContainer}>
			<Text style={{fontSize:24, fontFamily: 'monospace-typewriter'}}>
			{props.name}</Text>
			<FontAwesome style={{paddingRight: 0, paddingTop:5}} 
				name="close" 
				size={40} 
				color="gray" 
				onPress={this.onPress}
            />

              </View>
			{props.text ? (
				<Text>{props.text}</Text>
			) : (null)}
			{props.pictureURI ? (
				<Image
                resizeMode={'contain'}
                style={{alignSelf: 'center', width: (win.width*.95), height: (win.height*.7)}}
                source={{uri: props.pictureURI}}
              />
            ) : (null)}
            {props.groups.length !== 0 ? (
            	groupsWithHeader
            ) : (null)}
            {props.tags.length !== 0 ? (
            	tagsWithHeader
            ) : (null)}
		</View>
	);
}

const viewRecieptStyles = StyleSheet.create({
  menuContainer: {
    marginTop: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addButton: {
    marginTop: 5,
    padding: 5,
    flex: .9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
export default ViewReciept;