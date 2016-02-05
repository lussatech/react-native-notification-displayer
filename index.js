'use strict';

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight,
  ScrollView,
  ToastAndroid,
  BackAndroid
} from 'react-native';

import Navbar from './Navbar';
import Notification from './Notification';
import Server, {host as Host} from './Server';

export {Navbar, Notification, Server, Host};

export default class extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex:1,flexDirection:'column'}}>
        <View>
          <Navbar title={`Notifications`} onRefresh={() => this.forceUpdate()} />
        </View>
        <View style={{flex:1}}>
          <Notification />
        </View>
      </View>
    );
  }
}
