import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';
import storage from './helpers/storage.js'
import Swiper from './components/Swiper.js'
import Button from './components/Button.js'
import SegmentedControl from './components/SegmentedControl.js'

class FreeboxRemote extends Component {
  constructor(props){
    super(props)
    this.state = {
      swipeIndex: null,
      remoteCode: '',
      selectedRemote: null
    }
  }
  componentWillMount(){
    storage.get('remoteCode', 'selectedRemote').then(values => {
      const [ code, selectedRemote ] = values
      this.setState({
        remoteCode: code || '',
        swipeIndex: code ? 0 : 2,
        selectedRemote: selectedRemote || '1' // default
      })
    })
  }
  onCodeChange(remoteCode){
    if (/^[0-9]{0,10}$/.test(remoteCode)){
      this.setState({ remoteCode })
      storage.set('remoteCode', remoteCode);
    }
  }
  onSelectedRemoteChange(id){
    this.setState({ selectedRemote: id })
    storage.set('selectedRemote', id)
  }
  render() {
    if (this.state.swipeIndex === null) {
      return null
    }
    return (
      <View style={{backgroundColor: '#DCDCDC'}}>
      <Swiper index={this.state.swipeIndex} showsButtons={true} loop={false}>
        <View style={[styles.container, {bottom: 50}]}>
          {[['1','2','3'],
            ['4','5','6'],
            ['7','8','9'],
            [' ','0',' ']].map((cols, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                {cols.map((code, btnIndex) => (
                  code === ' ' ? <Text key={btnIndex} style={styles.text} /> : <Button key={btnIndex} code={code} />
                ))}
              </View>
          ))}
          <View style={styles.row}>
            <Button code="red" />
            <Button code="up" />
            <Button code="blue" />
          </View>
          <View style={styles.row}>
            <Button code="left" />
            <Button code="OK" />
            <Button code="right" />
          </View>
          <View style={styles.row}>
            <Button code="green" />
            <Button code="down" />
            <Button code="yellow" />
          </View>
          <View style={styles.row}>
            <Button code="home" />
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.row}>
            <Button code="av" />
            <Button code="power" />
          </View>
          <View style={styles.row}>
            <Text style={styles.text} />
          </View>
          <View style={styles.row}>
            <Button code="vol_inc" />
            <Button code="mute" />
            <Button code="prgm_inc" />
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>vol</Text>
            <Text style={styles.text} />
            <Text style={styles.text}>prog</Text>
          </View>
          <View style={styles.row}>
            <Button code="vol_dec" />
            <Button code="rec" />
            <Button code="prgm_dec" />
          </View>
          <View style={styles.row}>
            <Button code="bwd" />
            <Button code="play" />
            <Button code="fwd" />
          </View>
        </View>
        <View style={styles.container}>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 20}}>Code de la télécommande</Text>
          </View>
          <View style={{flex: 1, borderWidth: 1, borderColor: 'grey', borderRadius: 4, backgroundColor: 'white'}}>
            <TextInput
              onChangeText={this.onCodeChange.bind(this)}
              underlineColorAndroid="transparent"
              style={{ borderWidth: 1, padding: 0, fontSize: 20, paddingLeft: 5 }}
              value={this.state.remoteCode}
            />
          </View>
          <View style={{flex: 1}}>
            <View style={{flex: 1, height: 20}} />
              <Text style={{fontSize: 20}}>Télécommande</Text>
            </View>
            <SegmentedControl
              onChange={this.onSelectedRemoteChange.bind(this)}
              selected={this.state.selectedRemote}
            />
        </View>
      </Swiper>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 30,
    right: 30,
    top: 20
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  text: {
    width: 60,
    height: 30,
    padding: 10,
    margin: 5,
    borderColor: '#DDD',
    borderStyle: 'solid',
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    textAlign: 'center',
    fontSize: 20
  }
});

AppRegistry.registerComponent('FreeboxRemote', () => FreeboxRemote);
