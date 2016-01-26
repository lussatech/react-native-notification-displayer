'use strict';

import React, {
  Component,
  View,
  Text
} from 'react-native';

export default class extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text>{JSON.stringify(this.props.data)}</Text>
      </View>
    );
  }
}
