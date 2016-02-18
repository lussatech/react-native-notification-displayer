'use strict';

import React, {Component, Image, ListView, ProgressBarAndroid, Text, ToastAndroid, TouchableHighlight, View} from 'react-native'
import api, {host} from './Server'
import styles from './Style'

export default class extends Component {
  static propTypes = {
    passProps: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      nope: true,
      load: false,
      data: undefined
    };
  }

  componentDidMount() {
    api.doctor.findOne(this.props.passProps.id)
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
    let data = this.state.data;
    return (
      <View>
        <Text style={styles.date}>{(new Date(data.createdAt)).toISOString().slice(0, 10)}</Text>
        <Text style={styles.name}>{data.name} {data.title}</Text>
        <Text style={styles.clinic}>{data.clinic.name}</Text>
        <Text style={styles.desc}>{data.desc}</Text>
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
