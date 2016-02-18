'use strict';

import React, {Component, Text, View} from 'react-native'

export default class extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center',padding:13}}>
        <Text style={{textAlign:'center',color:'#333333'}}>
          {`Welcome to React Native!`}
        </Text>
      </View>
    )
  }
}
