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
      'monospace-typewriter': require('../../assets/fonts/MonospaceTypewriter.ttf'),
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
          <TouchableOpacity style={groupStyles.topnavReceipt} onPress={() => this.props.navigation.dispatch({ type: 'Main' })}>
            <MaterialIcons name="receipt" size={32} color="green" />
             {this.state.fontLoaded ? (
                <Text style={{ fontFamily: 'monospace-typewriter', fontSize: 20, marginTop: 2 }}>Receipts</Text>
              ) : (
                <Text>Receipts</Text>
              )}
          </TouchableOpacity>

          <View style={{padding: 42}}></View>

          <View style={{padding: 42}}></View>

          <TouchableOpacity style={groupStyles.addReciept} onPress={this.onPressAddReciept}>
            <MaterialIcons name="note-add" size={60} color="green" style={{alignSelf: 'flex-start'}} />
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
    backgroundColor: '#d3dee7',
  },
  navContainer: {
    flex: .1,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  mainContainer: {
    flex: .9,
    padding: 10,
    backgroundColor: '#d3dee7',
  },
  topnav: {
    width: 85,
    margin: 1,
    alignItems: 'center',
    borderLeftWidth: 3,
    borderTopLeftRadius: 10,
    borderRightWidth: 3,
    borderTopRightRadius: 10,
  },
  topnavReceipt: {
    width: 110,
    margin: 1,
    alignItems: 'center',
    borderLeftWidth: 3,
    borderTopLeftRadius: 10,
    borderRightWidth: 3,
    borderTopRightRadius: 10,
  },
  addReciept: {
    alignSelf: 'flex-end',
    width: 100,
    right: 0,
    borderLeftWidth: 3,
    borderBottomWidth: 3,
    borderBottomLeftRadius: 10,
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