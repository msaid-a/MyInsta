import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Login from './src/screens/login'
import Register from './src/screens/register'
import Home from './src/screens/home'
import MainStack from './src/routes/route'
import 'react-native-gesture-handler'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import reducers from './src/redux/reducers/index'
import DetailProfile from './src/screens/detailProfile'

let store = createStore(reducers)
export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <DetailProfile />
      </Provider>
    )
  }
}
