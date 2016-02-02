'use strict';

import React, {
  Component,
  View,
  Text,
  ListView,
  TouchableHighlight,
  ToastAndroid,
  Image,
  StyleSheet,
  Navigator,
  BackAndroid
} from 'react-native';

import api, {
  host
} from './Server';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 5
  },
  rightContainer: {
    flex: 1,
    margin: 8
  },
  name: {
    fontSize: 20,
    marginBottom: 0,
    textAlign: 'left'
  },
  clinic: {
    fontSize: 12,
    textAlign: 'left'
  },
  desc: {
    fontSize: 14,
    textAlign: 'left'
  },
  thumbnail: {
    width: 100,
    height: 100,
  },
  listView: {
    backgroundColor: '#F5FCFF'
  },
  title: {
    flex: 1,
    justifyContent: 'center'
  },
  titleText: {
    color: 'white',
    margin: 10,
    fontSize: 16
  }
});

class Display extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nope: true,
      load: false,
      data: undefined
    };
  }

  componentDidMount() {
    api.doctor.findOne(this.props.data.id)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText || response._bodyText);
        return response.json()
      })
      .then((responseData) => {
        this.setState({
          nope: responseData ? false : true,
          load: true,
          data: responseData
        });
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show(String(error).replace('Error: ',''), ToastAndroid.LONG);
      })
      .done();
  }

  render() {
    if (!this.state.load) return this.renderLoading();
    if (this.state.nope) return this.renderEmpty();

    return this.renderScene();
  }

  renderScene() {
    return (
      <View>
        <Text>{JSON.stringify(this.state.data)}</Text>
      </View>
    );
  }

  renderLoading() {
    return (
      <View style={styles.container}>
        <Text>fetching data...</Text>
      </View>
    );
  }

  renderEmpty() {
    return (
      <View style={styles.container}>
        <Text>no result found</Text>
      </View>
    );
  }
}

class Browse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nope: true,
      load: false,
      data: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };
  }

  componentDidMount() {
    api.doctor.find()
      .then((response) => {
        if (!response.ok) throw Error(response.statusText || response._bodyText);
        return response.json()
      })
      .then((responseData) => {
        this.setState({
          nope: responseData.length > 0 ? false : true,
          load: true,
          data: this.state.data.cloneWithRows(responseData)
        });
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show(String(error).replace('Error: ',''), ToastAndroid.LONG);
      })
      .done();
  }

  render() {
    if (!this.state.load) return this.renderLoading();
    if (this.state.nope) return this.renderEmpty();

    return this.renderScene();
  }

  renderScene() {
    return (
      <ListView
        style={styles.listView}
        dataSource={this.state.data}
        renderRow={this.renderRow.bind(this)}
        automaticallyAdjustContentInsets={false}
      />
    );
  }

  renderRow(data) {
    return (
      <TouchableHighlight onPress={() => this.props.navigator.push({name: 'view', data: data})}>
        <View style={styles.container}>
          <Image
            style={styles.thumbnail}
            source={{uri: host + '/images/doctors/' + data.picture}}
          />
          <View style={styles.rightContainer}>
            <Text style={styles.name}>{data.name} {data.title}</Text>
            <Text style={styles.clinic}>{data.clinic.name}</Text>
            <Text style={styles.desc}>{data.desc}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  renderLoading() {
    return (
      <View style={styles.container}>
        <Text>fetching data...</Text>
      </View>
    );
  }

  renderEmpty() {
    return (
      <View style={styles.container}>
        <Text>no result found</Text>
      </View>
    );
  }
}

export default class extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Navigator
        initialRoute={{name:'browse'}}
        renderScene={this.renderScene.bind(this)}
        configureScene={(route) => {
          return route.sceneConfig ? route.sceneConfig : Navigator.SceneConfigs.HorizontalSwipeJump;
        }}
      />
    );
  }

  renderScene(route, navigator) {
    switch (route.name) {
      case 'view':
        return <Display navigator={navigator} data={route.data} />
        break;
      default:
        return <Browse navigator={navigator} />
    }
  }
}
