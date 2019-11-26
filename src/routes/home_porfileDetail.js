import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'
import Home from '../screens/home'
import ProfileDetail from '../screens/detailProfile'

const HomeToProfile = createAppContainer(createStackNavigator({
    home : Home,
    detail : ProfileDetail
},{
    headerMode : 'none'
}))

export default HomeToProfile