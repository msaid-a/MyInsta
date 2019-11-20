import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Login from './src/screens/login'
import Register from './src/screens/register'
import Home from './src/screens/home'
import MainStack from './src/routes/route'
import 'react-native-gesture-handler'

export default class App extends Component {
  render() {
    return (
    
        <MainStack />
    )
  }
}
