import React, {Component} from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, Platform, Image, Dimensions, 
	Modal, TouchableOpacity } from 'react-native'; 
import { Dropdown } from 'react-native-material-dropdown';	
import {FontAwesome} from '@expo/vector-icons';

export default class FiltersModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			modalVisible: true,
			tagComponents: [],
			booleanFields: [{value: 'Unset',}, {value: 'True',}, {value: 'False',}],
  		};
	}

	componentDidMount() {
		this.setState({tags: this.props.tags});
	}

	getInput = () => {
		// let x = this.refs['Vendor'];
		let tags = this.state.tags;
		let refs = this.refs;

		let tagKeys = Object.keys(tags);
		let refKeys = Object.keys(refs);

		let selectedIds = [];
		tagKeys.map((tagKey) => {
			tags[tagKey].instances.map((instance) => {
				selectedIds.push(instance.recieptId);
			});
		});
		
		tagKeys.map((tagKey) => {
			if (tags[tagKey].type === "Number") {
				if ( (refs[tagKey+"Begin"]._lastNativeText) && (refs[tagKey+"End"]._lastNativeText) ) {
					let begin = Number(refs[tagKey+"Begin"]._lastNativeText);
					let end = Number(refs[tagKey+"End"]._lastNativeText);

					let tempIds = [];
					let instances = tags[tagKey].instances;
					instances.map((instance) => {
						if ( (instance.value>=begin) && (instance.value<=end) ) {
							let found = selectedIds.find(function(id) {
							  return id === instance.recieptId;
							});
							if (found) {
								tempIds.push(instance.recieptId);
							}
						}				
					});
					selectedIds = tempIds;
				}
			}
			else if (tags[tagKey].type === "Date") {
				if ( (refs[tagKey+"Begin"]._lastNativeText) && (refs[tagKey+"End"]._lastNativeText) ) {
					let beginDate = refs[tagKey+"Begin"]._lastNativeText;
					let endDate = refs[tagKey+"End"]._lastNativeText;

					let fieldsBeginDate = beginDate.split('/');
					let fieldsEndDate = endDate.split('/');
					let beginDateObj = new Date(fieldsBeginDate[2] + '-' + fieldsBeginDate[0] + '-' + fieldsBeginDate[1]);
					let endDateObj = new Date(fieldsEndDate[2] + '-' + fieldsEndDate[0] + '-' + fieldsEndDate[1]);

					let beginTime = beginDateObj.getTime();
					let endTime = endDateObj.getTime();
					
					let tempIds = [];
					let instances = tags[tagKey].instances;
					instances.map((instance) => {
						let fieldsDate = instance.value.split('/');
						let DateObj = new Date(fieldsDate[2] + '-' + fieldsDate[0] + '-' + fieldsDate[1]);
						let time = DateObj.getTime();
						if ( (time>=beginTime) && (time<=endTime) ) {
							let found = selectedIds.find(function(id) {
							  return id === instance.recieptId;
							});
							if (found) {
								tempIds.push(instance.recieptId);
							}
						}				
					});
					selectedIds = tempIds;
				}
			}
			else if (tags[tagKey].type === "Text") {
				if (refs[tagKey]._lastNativeText) {
					let text = refs[tagKey]._lastNativeText;
					let tempIds = [];
					let instances = tags[tagKey].instances;
					instances.map((instance) => {
						let contains = instance.value.match(new RegExp(text, 'i'));
						if (contains) {
							let found = selectedIds.find(function(id) {
							  return id === instance.recieptId;
							});
							if (found) {
								tempIds.push(instance.recieptId);
							}
						}
					});
					selectedIds = tempIds;
				}
			}
			else if (tags[tagKey].type === "Boolean") {
				if (refs[tagKey].state.value !== "Unset") {
					let bool = refs[tagKey].state.value;
					let tempIds = [];
					let instances = tags[tagKey].instances;
					instances.map((instance) => {
						if (instance.value === bool) {
							let found = selectedIds.find(function(id) {
							  return id === instance.recieptId;
							});
							if (found) {
								tempIds.push(instance.recieptId);
							}
						}
					});
					selectedIds = tempIds;
				}
			}
		});
		this.props.applyFilters(selectedIds);
		this.props.onClose();
	}

	render() {
		let items = [];
		if (this.state.tags) {
			let tags = this.state.tags;
			Object.keys(tags).map((tagName, index) => {
				if (tags[tagName].type === 'Number') {
					items.push(
						<View style={filterModalStyles.tagView} key={index}>
							<Text 
							style={filterModalStyles.headerText} 
							key={tagName}>{tagName},</Text>
							<View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
								<Text style={filterModalStyles.qualifier}>From: </Text>
								<TextInput
									placeholder="decimal/integer"
					                placeholderTextColor="gray"
					                style={filterModalStyles.textInputNumber}
					                ref={tagName+"Begin"}
					              />
					            <Text style={filterModalStyles.qualifier}> To: </Text>
					            <TextInput
					            	placeholder="decimal/integer"
					                placeholderTextColor="gray"
					                style={filterModalStyles.textInputNumber}
					                ref={tagName+"End"}
					              />
				            </View>
						</View>
					);
				}
				else if (tags[tagName].type === 'Text') {
					items.push(
						<View style={filterModalStyles.tagView} key={index}>
							<View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
								<Text 
								placeholder="decimal/integer"
					            placeholderTextColor="gray"
								style={filterModalStyles.headerText} 
								key={tagName}>{tagName}, Contains: </Text>
								<TextInput
									placeholder="text"
					                placeholderTextColor="gray"
					                style={filterModalStyles.textInput}
					                ref={tagName}
					              />
				            </View>
						</View>
					);
				}
				else if (tags[tagName].type === 'Date') {
					items.push(
						<View style={filterModalStyles.tagView} key={index}>
							<Text 
							style={filterModalStyles.headerText} 
							key={tagName}> 
							{tagName},</Text>
							<View style={{flexDirection: 'row'}}>
							<Text style={filterModalStyles.qualifier}>From: </Text>
								<TextInput
					                style={filterModalStyles.textInputDate}
					                placeholder="dd/mm/yyyy"
					                placeholderTextColor="gray"
					                ref={tagName+"Begin"}
					              />
					            <Text style={filterModalStyles.qualifier}> To: </Text>
					            <TextInput
					                style={filterModalStyles.textInputDate}
					                placeholder="dd/mm/yyyy"
					                placeholderTextColor="gray"
					                ref={tagName+"End"}
					              />
				            </View>
						</View>
					);
				}
				else if (tags[tagName].type === 'Boolean') {
					items.push(
						<View style={filterModalStyles.tagView} key={index}>
							<Text 
							style={filterModalStyles.headerText} 
							key={tagName}> 
							{tagName}, is</Text>
							<Dropdown
			                    value="Unset"
			                    data={this.state.booleanFields}
			                    itemCount={3}
			                    label='True/False'
			                    labelFontSize={16}
			                    ref={tagName}
			                  />
						</View>
					);
				}
			});
		}
		return (
				<Modal
		          animationType="slide"
		          transparent={false}
		          visible={this.props.modalVisible}
		          onRequestClose={() => {
		            //alert('Modal has been closed.');
		          }}> 
		          <ScrollView contentContainerStyle={filterModalStyles.mainContainer} endFillColor='#d3dee7'>
			          <View style={filterModalStyles.menuContainer}>
		                  <FontAwesome name="window-close-o" size={40} color="firebrick" onPress={() => {
		                        this.props.onClose();
		                      }}/>
		              </View>
		              <View style={{width: '90%'}}>
		              	{items}
		              </View>
		              <TouchableOpacity
	                   style={filterModalStyles.buttons}
	                   onPress={this.getInput}
	                 >
	                   <Text style={{fontSize:24, fontFamily: 'monospace-typewriter', color: '#042037'}}> Apply Filters </Text>
	                 </TouchableOpacity>
	                 <View style={{backgroundColor: '#d3dee7', marginTop: 50}}></View>
	              </ScrollView>
		        </Modal>
		);
	}
}

let marginTop = (Platform.OS === 'ios' ? 25 : 0);
const filterModalStyles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#d3dee7',
  },
  menuContainer: {
    marginTop: marginTop + 5,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  tagView: {
  	alignSelf: 'flex-start', 
  	marginTop: 15, 
  	marginBottom: 15, 
  	borderBottomWidth: 3,
  	borderColor: 'gray',
  },
  textInput: {
    width: 100,
    borderColor: 'gray', 
    borderWidth: 1,
    textAlignVertical: 'top',
    alignSelf: 'center',
  },
  textInputNumber: {
    marginTop: 15,
    width: 75,
    borderColor: 'gray', 
    borderWidth: 1,
    textAlignVertical: 'top',
    alignSelf: 'center',
  },
  textInputDate: {
    marginTop: 15,
    width: 100,
    borderColor: 'gray', 
    borderWidth: 1,
    textAlignVertical: 'top',
    alignSelf: 'center',
  },
  headerText: {
  	fontSize: 20, 
  	fontFamily: 'monospace-typewriter',
  },
  qualifier: {
  	marginTop: 15,
  	fontSize: 20, 
  	fontFamily: 'monospace-typewriter',
  },
  buttons: {
  	marginTop: 30,
    borderWidth: 1,
    backgroundColor: '#a9ccbf',
  },
});