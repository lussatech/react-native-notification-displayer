/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
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

import NotifNavbar from './Navbar';
import NotifBrowse from './Browse';
import NotifView from './View';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

let _navigator;

BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator.getCurrentRoutes().length === 1  ) {
    return false;
  }
  _navigator.pop();
  return true;
});

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView>
        <NotifNavbar title={'Example'} navigator={this.props.navigator} />
        <View>
          <Text style={styles.welcome}>
            Welcome to React Native!
          </Text>
          <Text style={styles.instructions}>
            To get started, edit index.android.js
          </Text>
          <Text style={styles.instructions}>
            Shake or press menu button for dev menu
          </Text>
        </View>
      </ScrollView>
    );
  }

  onActionSelected(position) {
    if (actions[position].route) {
      return this.gotoRoute(actions[position].route);
    }
    return ToastAndroid.show(actions[position].title, ToastAndroid.SHORT);
  }

  gotoRoute(name) {
    return this.props.navigator.push({name: name});
  }
}

export default class extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Navigator
        initialRoute={{name:'home'}}
        renderScene={this.renderScene.bind(this)}
        configureScene={(route) => {
          return route.sceneConfig ? route.sceneConfig : Navigator.SceneConfigs.HorizontalSwipeJump;
        }}
      />
    );
  }

  renderScene(route, navigator) {
    _navigator = navigator;
    switch (route.name) {
      case 'notification':
        return <NotifBrowse navigator={navigator} />
        break;
      case 'view':
        return <NotifView navigator={navigator} data={route.data} />
        break;
      default:
        return <Home navigator={navigator} />
    }
  }
}
