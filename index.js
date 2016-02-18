'use strict';

import React, {AppRegistry, BackAndroid, Component, Image, Navigator, ScrollView, StyleSheet, Text, ToastAndroid, TouchableHighlight, TouchableOpacity, View} from 'react-native'
import Browse from './Browse'
import Display from './Display'
import Home from './Home'
import Notification from './Notification'
import Server, {host as Host} from './Server'
import Style from './Style'

export {Browse, Display, Home, Host, Notification, Server, Style};
export default class extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Notification />
  }
}
