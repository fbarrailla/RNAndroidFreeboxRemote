import React, { Component } from 'react'
import { REMOTE_URL, ICONS } from '../constants.js'
import Icon from 'react-native-vector-icons/FontAwesome'
import {
  StyleSheet,
  TouchableNativeFeedback,
  View,
  Text
} from 'react-native'

class SegmentedControl extends Component {
  renderButton(id){
    const { selected } = this.props
    return (
      <TouchableNativeFeedback onPress={evt => this.props.onChange(id)}
        background={TouchableNativeFeedback.SelectableBackground()}>
        <View style={[styles.button, {
          [id === '1' ? 'borderTopLeftRadius' : 'borderTopRightRadius'] : 5,
          [id === '1' ? 'borderBottomLeftRadius' : 'borderBottomRightRadius']: 5,
          backgroundColor: id === selected ? '#007aff' : 'white'
        }]}>
          <Text style={{
            color: id === selected ? 'white' : '#333'
          }}>{id === '1' ? 'principale' : 'secondaire'}</Text>
        </View>
      </TouchableNativeFeedback>
    )
  }
  render(){
    const { selected } = this.props;
    return (
      <View style={styles.buttons}>
        {this.renderButton('1')}
        {this.renderButton('2')}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttons: {
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    marginTop: 5
  },
  button: {
    height: 40,
    backgroundColor: 'white',
    borderColor: '#CCC',
    borderStyle: 'solid',
    borderWidth: 2,
    flex: 1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  text: {
    textAlign: 'center',
    fontSize: 20
  },
  playPause: {
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  }
});

export default SegmentedControl
