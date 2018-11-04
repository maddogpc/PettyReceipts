import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native'; 
import TextComponent from './TextComponent';

const TextComponentContainer = props => {
	// const text = props.text;
	let {copy, text} = props;
	// console.log(copy);
	var componentWrap = text.map((text,i) => {
		return <TextComponent key={i} copy={copy} text={text}/>;
	});
	return (
		<View>
			{componentWrap}
		</View>
	);
}
export default TextComponentContainer;