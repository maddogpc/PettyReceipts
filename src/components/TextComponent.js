import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native'; 
const TextComponent = props => {
	onPress = () => {
		props.copy(props.text);
	}
	return (
		<View style={textViewStyles.addButton}>
			<Text style={{fontSize: 16, flex:.8, flexWrap: 'wrap'}}>{props.text}</Text>
			<Button
			  onPress={this.onPress}
			  title="Copy"
			  color="#841584"
			  accessibilityLabel="Learn more about this purple button"
			/>
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
export default TextComponent;