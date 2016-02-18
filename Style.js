'use strict';

import {StyleSheet} from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomColor: '#EBEBEB',
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
    alignSelf: 'flex-start',
    marginTop: 2,
    fontSize: 10
  },
  thumbnail: {
    width: 75,
    height: 75
  },
  listView: {
    backgroundColor: 'white'
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
