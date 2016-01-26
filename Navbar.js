'use strict';

import React, {
  Component,
  View,
  ToastAndroid,
  AsyncStorage
} from 'react-native';

import ToolbarAndroid from 'ToolbarAndroid';
import {key} from './Server';
import style from './Style';

const icons = {
  back: require('./ic_menu_back.png'),
  logo: require('./ic_menu_logo.png'),
  menu: require('./ic_menu_option.png'),
};

const actions = [
  {title: 'Notification', route: 'notification'},
];

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navigator: this.props.navigator,
          icons: this.props.icons || icons,
        actions: this.props.actions || actions,
          title: this.props.title,
        session: this.props.session
    };
  }

  render() {
    this.renderMenu();

    return (
      <View style={style.container}>
        <ToolbarAndroid
          style={style.toolbar}
          navIcon={(this.state.navigator && this.state.navigator.getCurrentRoutes().length > 1) ? this.state.icons.back : undefined}
          onIconClicked={this.goBack.bind(this)}
          logo={this.state.icons.logo}
          title={this.state.title}
          overFlowIcon={this.state.icons.menu}
          actions={this.state.actions}
          onActionSelected={this.onActionSelected.bind(this)}
        />
      </View>
    );
  }

  renderMenu() {
    let temp = [];

    this.state.actions.map((val, key) => {
      if (!val.auth) {
        temp.push(val);
      }
    });

    if (this.state.actions.length > temp.length) {
      AsyncStorage.getItem(key)
        .then((value) => {
          if (value !== null) {
            this.state.session = value;
          } else {
            this.state.actions = temp;
          }
        })
        .catch((error) => {
          ToastAndroid.show(String(error).replace('Error: ',''), ToastAndroid.SHORT);
        })
        .done();
    }
  }

  onActionSelected(position) {
    if (this.state.actions[position].route) {
      return this.gotoRoute(this.state.actions[position].route);
    }
    if (this.state.actions[position].title === 'Logout') {
      return this.onLogout();
    }
    return ToastAndroid.show(this.state.actions[position].title, ToastAndroid.SHORT);
  }

  goBack() {
    if (this.state.navigator) {
      this.state.navigator.pop();
    }
  }

  gotoRoute(name) {
    if (this.state.navigator && this.state.navigator.getCurrentRoutes()[this.state.navigator.getCurrentRoutes().length-1].name != name) {
      this.state.navigator.push({name: name});
    }
  }

  async onLogout() {
    try {
      await AsyncStorage.removeItem(key);
      ToastAndroid.show('Logout successfully!', ToastAndroid.SHORT);
      this.props.navigator.replace({
        name: 'login'
      });
    } catch (error) {
      ToastAndroid.show(String(error).replace('Error: ',''), ToastAndroid.SHORT);
    }
  }
}
