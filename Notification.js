'use strict';

import React, {Component, Image, Navigator, Text, ToastAndroid, TouchableOpacity, View} from 'react-native'
import Browse from './Browse'
import Home   from './Home'
import api    from './Server'
import styles from './Style'

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: 0
    }
  }

  componentDidMount() {
    api.doctor.find()
      .then((response) => {
        if (!response.ok) throw Error(response.statusText || response._bodyText);
        return response.json()
      })
      .then((responseData) => {
        this.setState({data: responseData.length});
      })
      .catch((error) => {
        this.onError(error);
      })
      .done(() => {
        //
      });
  }

  render() {
    return (
      <Navigator
        initialRoute={{
          component: Home,
              title: `Home`
        }}
        navigationBar={
          <Navigator.NavigationBar
            style={{backgroundColor:'teal'}}
            routeMapper={{
              LeftButton: (route, navigator, index, navState) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={{flex:1,justifyContent:'center',alignItems:'center'}}
                    onPress={() => {
                      navigator.replace({
                        component: Home,
                            title: `Home`
                      });
                    }}>
                    <View style={{alignSelf:'stretch',backgroundColor:'transparent',padding:10,alignItems:'center'}}>
                      <Image source={require('./icons/ic_menu_white.png')} />
                    </View>
                  </TouchableOpacity>
                )
              },
              Title: (route, navigator, index, navState) => {
                return (
                  <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'white',fontSize:17}}>{route.title}</Text>
                  </View>
                )
              },
              RightButton: (route, navigator, index, navState) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={{flex:1,justifyContent:'center',alignItems:'center'}}
                    onPress={() => {
                      this.setState({data: 0});
                      navigator.replace({
                        component: Browse,
                            title: `Notification`
                      });
                    }}>
                    <View style={{flex:1,flexDirection:'row',alignSelf:'stretch',backgroundColor:'transparent',padding:10,alignItems:'center'}}>
                      <Image source={require('./icons/ic_notifications_white.png')} />
                      {
                        this.state.data > 0 ? (
                          <View style={{position:'absolute',top:18,right:10,width:12,borderRadius:10,backgroundColor:'#CB5A5A'}}>
                            <Text style={{color:'white',fontSize:8,textAlign:'center'}}>{this.state.data}</Text>
                          </View>
                        ) : undefined
                      }
                    </View>
                  </TouchableOpacity>
                )
              }
            }}
          />
        }
        sceneStyle={{paddingTop:57}}
        renderScene={(route, navigator) => {
          return <route.component navigator={navigator} passProps={route.passProps} />;
        }}
        configureScene={(route) => {
          return route.sceneConfig ? route.sceneConfig : Navigator.SceneConfigs.HorizontalSwipeJump;
        }}
      />
    );
  }

  onError(argument) {
    console.log(argument);
    ToastAndroid.show(String(argument).replace('Error: ',''), ToastAndroid.LONG);
  }
}
