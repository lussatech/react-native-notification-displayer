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
  BackAndroid,
  ProgressBarAndroid
} from 'react-native';

import api, {host} from './Server';
import Navbar from './Navbar';

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
          data: responseData
        });
      })
      .catch((error) => {
        this.onError(error);
      })
      .done(() => {
        this.setState({load: !this.state.load});
      });
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
    return <ProgressBarAndroid />;
  }

  renderEmpty() {
    return (
      <View style={styles.container}>
        <Text>{`no result found`}</Text>
      </View>
    );
  }

  onError(argument) {
    console.log(argument);
    ToastAndroid.show(String(argument).replace('Error: ',''), ToastAndroid.LONG);
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
          data: this.state.data.cloneWithRows(responseData)
        });
      })
      .catch((error) => {
        this.onError(error);
      })
      .done(() => {
        this.setState({load: !this.state.load});
      });
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
      <TouchableHighlight
        underlayColor={'#D9D9D9'}
        onPress={() => this.props.navigator.push({name: 'view', data: data})}>
        <View style={styles.container}>
          <Image
            style={styles.thumbnail}
            source={{uri: `${host}/images/doctors/${data.picture}`}}
          />
          <View style={styles.rightContainer}>
            <Text style={styles.date}>{(new Date(data.createdAt)).toISOString().slice(0, 10)}</Text>
            <Text style={styles.name}>{data.name} {data.title}</Text>
            <Text style={styles.clinic}>{data.clinic.name}</Text>
            <Text style={styles.desc}>{data.desc}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  renderLoading() {
    return <ProgressBarAndroid />;
  }

  renderEmpty() {
    return (
      <View style={styles.container}>
        <Text>{`no result found`}</Text>
      </View>
    );
  }

  onError(argument) {
    console.log(argument);
    ToastAndroid.show(String(argument).replace('Error: ',''), ToastAndroid.LONG);
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomColor: '#FFFFFF',
    borderBottomWidth: 1,
  },
  rightContainer: {
    flex: 1,
    margin: 8,
    marginTop: 0
  },
  name: {
    fontSize: 20,
  },
  clinic: {
    fontSize: 12,
  },
  desc: {
    fontSize: 14,
  },
  date: {
    color: '#ABABAB',
    alignSelf: 'flex-end',
    marginTop: 2
  },
  thumbnail: {
    width: 100,
    height: 100
  },
  listView: {
    backgroundColor: 'transparent'
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
