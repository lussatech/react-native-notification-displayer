'use strict';

import React, {
  Component,
  View,
  Text,
  ListView,
  TouchableHighlight,
  ToastAndroid,
  Image,
  StyleSheet
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
  navbar: {
    backgroundColor: '#BF57FF',
    alignItems: 'center'
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

export default class extends Component {
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
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          nope: responseData.length > 0 ? false : true,
          load: true,
          data: this.state.data.cloneWithRows(responseData)
        });
      })
      .catch((error) => {
        ToastAndroid.show('something went wrong, please try again later', ToastAndroid.LONG);
      })
      .done();
  }

  render() {
    if (!this.state.load) {
      return this.renderLoading();
    }

    if (this.state.nope) {
      return this.renderEmpty();
    }

    return (
      <ListView
        style={styles.listView}
        dataSource={this.state.data}
        renderRow={this.renderData.bind(this)}
        automaticallyAdjustContentInsets={false}
      />
    );
  }

  renderLoading() {
    return (
      <View style={styles.container}>
        <Text>fetching data...</Text>
      </View>
    );
  }

  renderData(data) {
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

  renderEmpty() {
    return (
      <View style={styles.container}>
        <Text>no result found</Text>
      </View>
    );
  }
}
