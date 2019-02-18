import React from 'react';
import Expo, { SQLite } from 'expo';
import { connect } from 'react-redux';
import { Button, StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity, Dimensions} from 'react-native';
import GroupContainer from './GroupContainer';
import NewReciept from './NewReciept';
import {
  createGroup,
  addToGroup,
  createTag,
  addTagInstance,
  createReciept,
  removeReciept,
  removeRecieptFromGroups,
  removeGroupFromReciept,
  removeFromGroup,
  removeGroup,
  removeRecieptFromTags,
} from '../actions';
import { FontAwesome } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Font } from 'expo';

class GroupScreen extends React.Component {
  state = {
    fontLoaded: false,
    groupContainerComponents: [],
    newRecieptModalVisible: false,
    deleteModalVisible: false,
    deleteModalVisible: false,
    createGroupModalVisible: false,
    createGroup: null,
    deleteModalId: null,
    deleteGroupName: null,
    deleteGroup: null,
    groupNameInputVal: null,
    refresh: false,
  };

  createGroupFunc = (name, recieptIds) =>  {
    this.props.dispatch( createGroup(name, recieptIds) );
  }

  addToGroupFunc = (name, newId) =>  {
    this.props.dispatch( addToGroup(name, newId) );
  }

  createTagFunc = (name, type) => {
    this.props.dispatch( createTag(name, type) );
  }

  addTagInstanceFunc = (tagName, recieptId, value) => {
    this.props.dispatch( addTagInstance(tagName, recieptId, value) );
  }

  createRecieptFunc = (name, text, pictureURI, groups, tags) => {
    this.props.dispatch( createReciept(name, text, pictureURI, groups, tags) );
  }

  onPressAddReciept = () => {
    this.setState({newRecieptModalVisible: true});
  }

  onCloseModal = () => {
    this.setState({newRecieptModalVisible: false});
  }

  //^^^For New Reciept

  removeRecieptModal = () => {
    let id = this.state.deleteModalId;
    let groupName = this.state.deleteGroupName;

    this.props.dispatch( removeGroupFromReciept(id, groupName) );
    this.props.dispatch( removeFromGroup(id, groupName) );
    this.setState({deleteModalVisible: false});
  }

  removeGroupModal = () => {
    let groupName = this.state.deleteGroup;
    let ids = this.state.deleteGroupIds;
    this.props.dispatch( removeGroup(groupName) );
    ids.map((id) => {
      this.props.dispatch( removeGroupFromReciept(id, groupName) );
    });
    this.setState({deleteGroupModalVisible: false});
  }

  createGroupModal = () => {
    let groupName = this.state.groupNameInputVal;
    this.props.dispatch( createGroup(groupName, []) );
    this.setState({createGroupModalVisible: false});
  }

  removeHandler = (id, groupName) => {
    this.setState({deleteModalVisible: true, deleteModalId: id, deleteGroupName: groupName});
  }

  removeGroupHandler = (groupName, ids) => {
    this.setState({deleteGroupModalVisible: true, deleteGroup: groupName, deleteGroupIds: ids});
  }

  createGroupHandler = () => {
    this.setState({createGroupModalVisible: true});
  }

  async componentDidMount() {
    await Font.loadAsync({
      'monospace-typewriter': require('../../assets/fonts/zilla-slab.medium.ttf'),
      'zilla-slab.semibold': require('../../assets/fonts/zilla-slab.semibold.ttf'),
    });
    this.setState({fontLoaded: true});
  }

  render() {
    const win = Dimensions.get('window');
    let groups = this.props.groupsRedux.groupItems;
    let keys = Object.keys(groups);
    let groupContainerComponents = [];
    if (this.state.fontLoaded) {
        groupContainerComponents = keys.map((key, i) => {
         let group = groups[key];
         return <GroupContainer key={i} name={key} recieptIds={group.recieptIds} 
          reciepts={this.props.reciepts} removeHandler={this.removeHandler} 
          removeGroupHandler={this.removeGroupHandler}/>
      });
    }
    return (
      <View style={groupStyles.container}>
        
        <View style={groupStyles.navContainer}>
          <TouchableOpacity style={groupStyles.topnavSelected} onPress={() => this.props.navigation.dispatch({ type: 'Groups' })}>
            <FontAwesome name="object-group" size={40} color="#fff" style={{marginTop:5}} />
             {this.state.fontLoaded ? (
                <Text style={{ color:'white', fontFamily: 'zilla-slab.semibold', fontSize: 20, marginTop: 2 }}>Groups</Text>
              ) : (
                <Text>Groups</Text>
              )}
          </TouchableOpacity>

          <View style={{width: '25%'}}>
              
            </View>

            
              <TouchableOpacity style={groupStyles.topnav} onPress={() => this.props.navigation.dispatch({ type: 'Main' })}>
              <MaterialIcons name="receipt" size={40} color="#3EA9C1" style={{marginTop:5}} />
               {this.state.fontLoaded ? (
                  <Text style={{ color: 'black', fontFamily: 'zilla-slab.semibold', fontSize: 20, marginTop: 2 }}>Receipts</Text>
                ) : (
                  <Text>Receipts</Text>
                )}
              </TouchableOpacity>
            

          {/*<View style={{padding: 50}}></View>*/}
          
          
          <TouchableOpacity style={groupStyles.addReciept} onPress={this.onPressAddReciept}>
            <MaterialIcons name="note-add" size={80} color="#3EA9C1"  />
          </TouchableOpacity>
        </View>

        <View style={groupStyles.mainContainer}>
          <ScrollView>
          {groupContainerComponents}
          </ScrollView>
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
            showModal={this.state.newRecieptModalVisible}
            />
          ) : (
          null
          )}

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
              <Text style={{fontSize:20, marginTop: 5, marginLeft: 5}}> Remove Item from Group?</Text>
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

        {this.state.deleteGroupModalVisible ? (
          <View style={{
            position: 'absolute', 
            left: (win.width/5), 
            width: (win.width*.6), 
            top: (win.height/5), 
            height: (win.height*.2), 
            backgroundColor: 'white',
            borderWidth: 1,
          }}>
              <Text style={{fontSize:20, marginTop: 5, marginLeft: 5}}> Remove Group?</Text>
              <Text style={{alignSelf: 'flex-start', marginLeft: 5}}>(Receipts will not be deleted)</Text>
              <View style={{
                width: '100%',
                justifyContent: 'space-between', 
                flexDirection: 'row', 
                position: 'absolute', 
                bottom: 10
              }}>
                <Button
                  onPress={() => this.setState({deleteGroupModalVisible:false})}
                  title="No"
                  color="teal"
                  accessibilityLabel="Learn more about this purple button"
                />
                <Button
                  onPress={this.removeGroupModal}
                  title="Yes"
                  color="red"
                  accessibilityLabel="Learn more about this purple button"
                />
              </View>
          </View>
          ) : (
          null
          )}

          {this.state.createGroupModalVisible ? (
          <View style={{
            position: 'absolute', 
            left: (win.width/5), 
            width: (win.width*.6), 
            bottom: (win.height/5), 
            height: (win.height*.2), 
            backgroundColor: 'white',
            borderWidth: 1,
          }}>
              <Text style={{fontSize:20, marginTop: 5, marginLeft: 5}}> Create Group:</Text>
              <TextInput
                style={{
                marginTop: 10,
                width: '95%',
                borderColor: 'gray', 
                borderWidth: 1,
                textAlignVertical: 'top',
                alignSelf: 'center',
              }}
                onChangeText={(groupNameInputVal) => this.setState({groupNameInputVal})}
                value={this.state.groupNameInputVal}
              />
              <View style={{
                width: '100%',
                justifyContent: 'space-between', 
                flexDirection: 'row', 
                position: 'absolute', 
                bottom: 10
              }}>
                <Button
                  onPress={() => this.setState({createGroupModalVisible:false})}
                  title="No"
                  color="red"
                  accessibilityLabel="Learn more about this purple button"
                />
                <Button
                  onPress={this.createGroupModal}
                  title="Create"
                  color="teal"
                  accessibilityLabel="Learn more about this purple button"
                />
              </View>
          </View>
          ) : (
          null
          )}
      </View>
    );
  }
}

// LoginScreen.propTypes = {
//   navigation: PropTypes.object.isRequired,
// };

const groupStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  }
});

GroupScreen.navigationOptions = {
  title: 'Groups',
};

const mapStateToProps = state => ({
  reciepts: state.reciepts.recieptItems,
  groupsRedux: state.groups,
  tagsRedux: state.tags,
  recieptIdCount: state.reciepts.id,
});

export default connect(mapStateToProps)(GroupScreen);