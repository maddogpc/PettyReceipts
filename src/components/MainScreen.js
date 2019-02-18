import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Image, List, ListItem, FlatList, 
  TouchableHighlight, Dimensions, Button } from 'react-native';
import Expo, { SQLite } from 'expo';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  createGroup,
  addToGroup,
  createTag,
  addTagInstance,
  createReciept,
  removeReciept,
  removeRecieptFromGroups,
  removeRecieptFromTags,
} from '../actions';
import AuthButton from './AuthButton';
import NewReciept from './NewReciept';
import ViewReciept from './ViewReciept';
import FiltersModal from './FiltersModal';
import { FontAwesome } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Font } from 'expo';

class MainScreen extends React.Component {
  state = {
    fontLoaded: false,
    newRecieptModalVisible: false,
    filtersModalVisible: false,
    deleteModalVisible: false,
    deleteModalId: null,
    filtersApplied: false,
    recieptData: [],
  };

  async componentDidMount() {
    await Font.loadAsync({
      'monospace-typewriter': require('../../assets/fonts/zilla-slab.medium.ttf'),
      'zilla-slab.semibold': require('../../assets/fonts/zilla-slab.semibold.ttf'),
    });
    let reciepts = this.props.reciepts;
    var reformattedArray = reciepts.map(reciept =>{ 
       reciept.key = String(reciept.id);
       return reciept;
    });
    this.setState({fontLoaded: true, recieptData: reformattedArray});
  }

  applyFilters = (recieptIds) => {
    let reciepts = this.props.reciepts;
    let filteredReciepts = [];
    reciepts.map(reciept => { 
      let found = recieptIds.find(function(id) {
        return id === reciept.id;
      });
      if (found) {
        reciept.key = String(reciept.id);
        filteredReciepts.push(reciept);
      }
    });
    this.setState({filtersApplied: true, recieptData: filteredReciepts});
  }

  resetFilters = () => {
    let reciepts = this.props.reciepts;
    var reformattedArray = reciepts.map(reciept =>{ 
       reciept.key = String(reciept.id);
       return reciept;
    });
    this.setState({filtersApplied: false, recieptData: reformattedArray});
  }

  componentDidUpdate(prevProps) {
    let reciepts = this.props.reciepts;
    if (prevProps.reciepts !== this.props.reciepts) {
      var reformattedArray = reciepts.map(reciept =>{ 
         reciept.key = String(reciept.id);
         return reciept;
      });
      this.setState({recieptData: reformattedArray});
    }
  }

  createGroupFunc = (name, recieptIds) =>  {
    this.props.dispatch( createGroup(name, recieptIds) );
  }

  addToGroupFunc = (name, newId) =>  {
    this.props.dispatch( addToGroup(name, newId) );
  }

  createTagFunc = (name, type, recieptId, value) => {
    this.props.dispatch( createTag(name, type, recieptId, value) );
  }

  addTagInstanceFunc = (tagName, recieptId, value) => {
    this.props.dispatch( addTagInstance(tagName, recieptId, value) );
  }

  createRecieptFunc = (name, text, pictureURI, groups, tags) => {
    this.props.dispatch( createReciept(name, text, pictureURI, groups, tags) );
  }

  removeRecieptFunc = (id) => {
    this.setState({deleteModalVisible: true, deleteModalId: id});
  }

  removeRecieptModal = () => {
    let id = this.state.deleteModalId;
    this.props.dispatch( removeReciept(id) );
    this.props.dispatch( removeRecieptFromGroups(id) );
    this.props.dispatch( removeRecieptFromTags(id) );
    this.setState({deleteModalVisible: false});
  }

  removeRecieptFromGroupsFunc = (id) => {
    this.props.dispatch( removeRecieptFromGroups(id) );
  }

  removeRecieptFromTagsFunc = (id) => {
    this.props.dispatch( removeRecieptFromTags(id) );
  }

  onPress = () => {
    this.setState({newRecieptModalVisible: true});
  }

  onPressOrganize = () => {
    this.setState({filtersModalVisible: true});
  }

  onCloseModal = () => {
    this.setState({newRecieptModalVisible: false});
  }

  onCloseFiltersModal = () => {
    this.setState({filtersModalVisible: false});
  }

  render() {
    const win = Dimensions.get('window');
    return (
      <View style={styles.container}>
        <View style={styles.navContainer}>

          <TouchableOpacity style={styles.topnav} onPress={() => this.props.navigation.dispatch({ type: 'Groups' })}>
            <FontAwesome name="object-group" size={40} color="#3EA9C1" style={{marginTop:5}} />
             {this.state.fontLoaded ? (
                <Text style={{ fontFamily: 'zilla-slab.semibold', fontSize: 20, marginTop: 2 }}>Groups</Text>
              ) : (
                <Text>Groups</Text>
              )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.topnav} onPress={this.onPressOrganize}>
              <FontAwesome name="search" size={40} color="#3EA9C1" style={{marginTop:5}} />
               {this.state.fontLoaded ? (
                  <Text style={{ color: 'black', fontFamily: 'zilla-slab.semibold', fontSize: 20 }}>Search</Text>
                ) : (
                  <Text>Search</Text>
                )}
            </TouchableOpacity>
            
          <TouchableOpacity style={styles.topnavSelected} onPress={() => this.props.navigation.dispatch({ type: 'Main' })}>
            <MaterialIcons name="receipt" size={40} color="#fff" style={{marginTop:5}} />
             {this.state.fontLoaded ? (
                <Text style={{ color: 'white', fontFamily: 'zilla-slab.semibold', fontSize: 20, marginTop: 2 }}>Receipts</Text>
              ) : (
                <Text>Receipts</Text>
              )}
            </TouchableOpacity>
            

          {/*<View style={{padding: 50}}></View>*/}
          
          
          <TouchableOpacity style={styles.addReciept} onPress={this.onPress}>
            <MaterialIcons name="note-add" size={80} color="#3EA9C1"  />
          </TouchableOpacity>
         
        </View>

        <View style={styles.mainContainer}>

        {this.state.filtersApplied ? (
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 20}}>Filters are being applied.</Text>
            <TouchableOpacity onPress={this.resetFilters}>
              <Text style={{fontSize: 20, color: 'teal'}}> Reset Filters?</Text>
            </TouchableOpacity>
          </View>
          ) : (
          null
          )}

        <FlatList
          inverted={true}
          data={this.state.recieptData}
          renderItem={({item}) => <ViewReciept 
          id={item.id} 
          name={item.name} 
          text={item.text} 
          pictureURI={item.pictureURI}
          tags={item.tags}
          groups={item.groups}
          removeReciept={this.removeRecieptFunc}
          removeRecieptFromGroups={this.removeRecieptFromGroupsFunc}
          removeRecieptFromTags={this.removeRecieptFromTagsFunc}
          />}
        />

        {this.state.deleteModalVisible ? (
          <View style={{
            position: 'absolute', 
            left: (win.width/5), 
            width: (win.width*.6), 
            top: (win.height/5), 
            height: (win.height*.2), 
            backgroundColor: 'white',
            borderWidth: 1,
          }}>
              <Text style={{fontSize:20, marginTop: 5, marginLeft: 5}}> Delete Item?</Text>
              <View style={{
                width: '100%',
                justifyContent: 'space-between', 
                flexDirection: 'row', 
                position: 'absolute', 
                bottom: 10
              }}>
                <Button
                  onPress={() => this.setState({deleteModalVisible:false})}
                  title="No"
                  color="teal"
                  accessibilityLabel="Learn more about this purple button"
                />
                <Button
                  onPress={this.removeRecieptModal}
                  title="Yes"
                  color="red"
                  accessibilityLabel="Learn more about this purple button"
                />
              </View>
          </View>
          ) : (
          null
          )}

        </View>

        {this.state.newRecieptModalVisible ? (
            <NewReciept 
            id={this.props.recieptIdCount} 
            groups={this.props.groupsRedux} 
            tags={this.props.tagsRedux}
            createGroup={this.createGroupFunc} 
            addToGroup={this.addToGroupFunc}
            createTag={this.createTagFunc} 
            addTagInstance={this.addTagInstanceFunc}
            createReciept={this.createRecieptFunc}
            onClose={this.onCloseModal} 
            showModal={this.state.newRecieptModalVisible}/>
          ) : (
          null
          )}
        {this.state.filtersModalVisible ? (
          <FiltersModal 
          modalVisible={this.state.filtersModalVisible} 
          tags={this.props.tagsRedux.tagItems}
          applyFilters={this.applyFilters}
          onClose={this.onCloseFiltersModal}
          />
          ) : (
          null
          )}

        </View>
        
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navContainer: {
    flex: .13,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 10,
    borderBottomColor: '#3EA9C1',
  },
  mainContainer: {
    flex: .87,
    padding: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  topnav: {
    width: '25%',
    marginLeft: 5,
    alignItems: 'center',
    borderColor: '#3EA9C1',
    borderTopWidth: 3,
    borderTopLeftRadius: 15, 
    borderTopRightRadius: 15,
    borderLeftWidth: 3,
    borderTopLeftRadius: 15,
    borderRightWidth: 3,
    borderTopRightRadius: 15,
    borderRightWidth: 3,
    borderTopRightRadius: 15,
  },
  topnavSelected: {
    width: '25%',
    marginLeft: 5,
    alignItems: 'center',
    backgroundColor: '#3EA9C1', 
    borderTopLeftRadius: 15, 
    borderTopRightRadius: 15,
  },
  addReciept: {
    width: '25%',
  },
  groupsText: {
    fontSize:20,
  },
});

const mapStateToProps = state => ({
  reciepts: state.reciepts.recieptItems,
  groupsRedux: state.groups,
  tagsRedux: state.tags,
  recieptIdCount: state.reciepts.id,
});

export default connect(mapStateToProps)(MainScreen);