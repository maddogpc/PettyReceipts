import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Dimensions } from 'react-native'; 
import { FontAwesome } from '@expo/vector-icons';
import {Ionicons} from '@expo/vector-icons';

export default class CollapsableReciept extends React.Component {

	state = {
		expanded: false,
		id: this.props.id,
  	};

  	expand = () => {
		this.setState({expanded: true});
	}

	collapse = () => {
		this.setState({expanded: false});
	}

	remove = () => {
		this.props.removeReciept(this.props.id);
	}
	
	render() {
		let tagHeader = [<Text key={0}>Tags: </Text>];
		let tags = this.props.tags.map((tag, i) => {
			return <Text key={i+1}>{tag.name}: {tag.value}</Text>;
		});
		tagsWithHeader = tagHeader.concat(tags);

		return (
			<View style={{flex:1}}>
				{!this.state.expanded ? (
					<View style={{flexDirection: 'row', justifyContent:'space-between'}}>
						<TouchableOpacity onPress={this.expand}>
							<View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
		                		<Text style={{ fontFamily: 'monospace-typewriter', fontSize: 20, marginTop: 2 }}>{this.props.recieptName} </Text>
		                		<FontAwesome style={{alignSelf: 'center'}} name="caret-right" size={20} color="blue" />
		            		</View>
		        		</TouchableOpacity>
		        		<TouchableOpacity>
	            			<FontAwesome style={{alignSelf: 'center'}} name="minus-square" size={25} color="red" onPress={this.remove} />
	            		</TouchableOpacity>
            		</View>
	        		) : (
		        	<View>
						<View style={{flexDirection: 'row', justifyContent:'space-between'}}>
							<TouchableOpacity onPress={this.collapse}>
								<View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
			                		<Text style={{ fontFamily: 'monospace-typewriter', fontSize: 20, marginTop: 2 }}>{this.props.recieptName} </Text>
			                		<FontAwesome style={{alignSelf: 'center'}} name="caret-down" size={20} color="blue" />
			            		</View>
			        		</TouchableOpacity>
			        		<TouchableOpacity>
		            			<FontAwesome style={{alignSelf: 'center'}} name="minus-square" size={25} color="red" onPress={this.remove} />
		            		</TouchableOpacity>
	            		</View>
            		

			             <View style={{marginLeft:15, width: '80%'}}>
							{this.props.text ? (
								<Text>{this.props.text}</Text>
							) : (null)}
							{this.props.pictureURI ? (
								<Image
				                resizeMode={'contain'}
				                source={{uri: this.props.pictureURI}}
				              />
				            ) : (null)}
				            {this.props.tags.length !== 0 ? (
				            	tagsWithHeader
				            ) : (null)}
			            </View>
			            <TouchableOpacity>
							<Text style={{fontFamily: 'monospace-typewriter', fontSize: 16, color: 'teal', marginLeft:15}}>Edit Receipt</Text>
						</TouchableOpacity>
					</View>
		        )}
			</View>
		);
	}
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