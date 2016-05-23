import React, { Component } from 'react';
import { ICONS, COLORS } from '../constants.js';
import storage from '../helpers/storage.js'
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  StyleSheet,
  TouchableNativeFeedback,
  View,
  Text
} from 'react-native';

class Button extends Component {
  constructor(props) {
    super(props)
    this._interval = null
    this._counter = 0
    this.state = {
      pressed: false
    }
  }
  onPressIn() {
    if (!this.state.pressed) {
      this._interval = setInterval(() => {
        this._counter++
        this.press(this._counter > 6)
      }, 200)
      this.setState({ pressed: true })
    }
  }
  onPressOut() {
    clearInterval(this._interval)
    this._counter = 0
    this.setState({ pressed: false })
  }
  onPressButton(evt) {
    this.press()
  }
  press(longPress=false) {
    const { code } = this.props
    storage.get('remoteCode', 'selectedRemote').then(values => {
      let [remoteCode, box] = values
      box = box || '1'
      let url = `http://hd${box}.freebox.fr/pub/remote_control?code=${remoteCode}&key=${code}`
      if (longPress) {
        url += '&long=true'
      }
      fetch(url)
        .then(r => {
          if (r.status === 403) {
            alert('Votre code télécommande est incorrect')
          }
        })
        .catch(e => {
          alert('Vérifiez votre connexion Wi-Fi')
        })
    })
  }
  renderContent() {
    const { code } = this.props;
    if (!ICONS[code]) {
      return <Text style={styles.text}>{code}</Text>
    } else if (code === 'play') {
      return (
        <View style={styles.playPause}>
          <Icon name="play" size={30} color="#333" />
          <Icon name="pause" size={30} color="#333" />
        </View>
      )
    } else {
      return <Icon name={ICONS[code]} size={35} color={COLORS[code] ? 'white': '#333'} />
    }
  }
  getColorStyle() {
    const { code } = this.props
    if (COLORS[code]) {
      return {
        backgroundColor: COLORS[code]
      }
    }
    return {}
  }
  render(){
    return (
      <TouchableNativeFeedback
        onPressIn={this.onPressIn.bind(this)}
        onPressOut={this.onPressOut.bind(this)}
        onPress={this.onPressButton.bind(this)}
        background={TouchableNativeFeedback.SelectableBackground()}>
        <View style={[styles.button, this.getColorStyle()]}>
          {this.renderContent()}
        </View>
      </TouchableNativeFeedback>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    borderColor: '#CCC',
    borderStyle: 'solid',
    borderWidth: 2,
    flex:1,
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

export default Button;
