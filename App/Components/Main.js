import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ActivityIndicator,
  NavigatorIOS } from 'react-native';
import api from '../Utils/api'
import Dashboard from './Dashboard'

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
        padding: 30,
        marginTop: 65,
        flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#48BBEC'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff'
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
});

export default class Main extends React.Component{
  state = {
    username: '',
    isLoading: false,
    error: false
  }

    handleChange(event) {
      this.setState({
        username: event.nativeEvent.text
      });
    }

    handleSubmit() {
      this.setState({
        isLoading: true
      });
      api.getBio(this.state.username)
        .then((res) => {
          if (res.message === 'Not Found') {
            this.setState({
              error: `User Not Found`,
              isLoading: false,
            })
          } else {
            this.props.navigator.push({
              title: res.name || 'Select an option',
              component: Dashboard,
              passProps: {userInfo: res}
            });
            this.setState({
              isLoading: false,
              error: false,
              username: ''
            })
          }
        });
      console.log('submit', this.state.username)
    }

  render() {
    var showErr = (
      this.state.error ? <Text> {this.state.error} </Text> : <View></View>
    )

    return (
      <View style={styles.mainContainer}>
        <Text style={styles.title}> Search for a github user </Text>
        <TextInput
          style={styles.searchInput}
          value={this.state.username}
          onChange={this.handleChange.bind(this)}
        />
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this)}
          underlayColor="white">
          <View><Text style={styles.buttonText}> Search </Text></View>
        </TouchableHighlight>
        <ActivityIndicator
          animating={this.state.isLoading}
          color="#111"
          size="large"></ActivityIndicator>
        {showErr}
      </View>
    )
  }
};
