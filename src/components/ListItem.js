import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native'; 
import { FontAwesome } from '@expo/vector-icons';
const ListItem = props => {
	onPress = () => {
		props.onClose(props.type, props.text);
		// console.log(props);
	}
	return (
		<View style={textViewStyles.addButton}>
			<Text style={{fontSize: 16, flex:.8, flexWrap: 'wrap'}}>{props.text}</Text>
			<FontAwesome name="close" size={30} color="gray" onPress={this.onPress}/>
		</View>
	);
}

const textViewStyles = StyleSheet.create({
  addButton: {
    marginTop: 5,
    padding: 5,
    flex: .9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
export default ListItem;