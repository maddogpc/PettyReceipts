import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native'; 
import CollapsableReciept from './CollapsableReciept';
import { FontAwesome } from '@expo/vector-icons';
import {Ionicons} from '@expo/vector-icons';
import {AntDesign} from '@expo/vector-icons';

export default class GroupContainer extends React.Component {
	expand = () => {
		this.setState({expanded: true});
	}

	collapse = () => {
		this.setState({expanded: false});
	}

	onCloseGroup = () => {
		this.props.removeGroupHandler(this.props.name, this.props.recieptIds);
	}

	state = {
		expanded: false,
  	};
	
	render() {
		let reciepts = this.props.reciepts;
		let recieptIds = this.props.recieptIds;
		let recieptComponents = recieptIds.map((id) => {
			let recieptTemp = reciepts.find(function(reciept) {
		        return id === reciept.id;
		    });
		    return ( 
		    	<View key={id}>
						{this.state.expanded ? (
							<View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, marginLeft: 10}}>
								<CollapsableReciept 
								id={recieptTemp.id}
								recieptName={recieptTemp.name} 
								text={recieptTemp.text} 
								pictureURI={recieptTemp.pictureURI}
								groups={recieptTemp.groups}
								tags={recieptTemp.tags}
								removeReciept={(id) => this.props.removeHandler(id, this.props.name)}
								/>
	                		</View>
		                ) : (
				        	null
				          )}
				</View>
			);
		});

		return (
			<View>
			{!this.state.expanded ? (
				<View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
					<TouchableOpacity onPress={this.expand}>
						<View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
	                		<Text style={{ fontFamily: 'monospace-typewriter', fontSize: 20, marginTop: 2 }}>{this.props.name} </Text>
	                		<FontAwesome style={{alignSelf: 'center'}} name="caret-right" size={20} color="gray" />
	            		</View>
	            	</TouchableOpacity>
	            	<Ionicons style={{paddingRight: 10, paddingTop:5}} 
	            		style={{alignSelf:'center'}}
						name="md-close" 
						size={30} 
						color="#B0D235" 
						onPress={this.onCloseGroup}
		            />
            	</View>
            ) : (
	          	<View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
					<TouchableOpacity onPress={this.collapse}>
						<View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
	                		<Text style={{ fontFamily: 'monospace-typewriter', fontSize: 20, marginTop: 2 }}>{this.props.name} </Text>
	                		<FontAwesome style={{alignSelf: 'center'}} name="caret-down" size={20} color="gray" />
	            		</View>
	            	</TouchableOpacity>
	            	<Ionicons style={{paddingRight: 10, paddingTop:5}} 
	            		style={{alignSelf:'center'}}
						name="md-close" 
						size={30} 
						color="#B0D235" 
						onPress={this.onCloseGroup}
		            />
            	</View>
	          )}
				{recieptComponents}
				
			</View>
		);
	}
}