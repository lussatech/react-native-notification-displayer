'use strict';

import React, {Component, Image, ListView, ProgressBarAndroid, Text, ToastAndroid, TouchableHighlight, View} from 'react-native'
import api, {host} from './Server'
import styles from './Style'
import Display from './Display'

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
        onPress={() => {
          this.props.navigator.replace({
            component: Display,
                title: `Notification`,
            passProps: data
          })
        }}>
        <View style={styles.container}>
          <Image
            style={styles.thumbnail}
            source={{uri: `${host}/images/doctors/${data.picture}`}}
          />
          <View style={styles.rightContainer}>
            <Text style={styles.date}>{(new Date(data.createdAt)).toISOString().slice(0, 10)}</Text>
            <Text style={styles.name}>{data.name} {data.title}</Text>
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
