'use strict';

import React, {
  Component,
  View,
  ToastAndroid,
  StyleSheet
} from 'react-native';

import ToolbarAndroid from 'ToolbarAndroid';

const style = StyleSheet.create({
  title: {
    alignSelf: 'center',
    fontSize: 30,
    padding: 8
  },
  button: {
    backgroundColor: '#EC7E48',
    padding: 15,
    marginTop: 20,
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
  buttonText: {
    fontSize: 15,
    color: 'white',
    alignSelf: 'center'
  },
  container: {
    flex: 1,
    alignItems: 'stretch',
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
  toolbar: {
    height: 60,
    backgroundColor: '#D6D2D2'
  }
});

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
    };
  }

  render() {
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

  onActionSelected(position) {
    if (this.state.actions[position].route) {
      return this.gotoRoute(this.state.actions[position].route);
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
}
