import { AsyncStorage } from 'react-native';

export default {
  get(...keys) {
    return new Promise((resolve, reject) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
        resolve(stores.map(s => s[1]))
      })
    })
  },
  set(key, val) {
    AsyncStorage.setItem(key, val)
  }
}

function getItem(key) {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(key, (err, value) => {
      if (!err) {
        resolve(value)
      } else {
        reject(key)
      }
    })
  })
}
