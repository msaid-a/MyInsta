import React from 'react'
import {createMaterialTopTabNavigator} from 'react-navigation-tabs'
import {createAppContainer} from 'react-navigation'
import Home from '../screens/home'
import Explorer from '../screens/explore'
import PostImage from '../screens/postImage'
import Profile from '../screens/editProfile'
import Icon from 'react-native-vector-icons/FontAwesome'


const MainTab = createAppContainer(createMaterialTopTabNavigator(
    {
        home : {
            screen : Home,
            navigationOptions:{
                tabBarIcon : <Icon name="home" size={24} />
            }
        },
        explore : {
            screen : Explorer,
            navigationOptions:{
                tabBarIcon : <Icon name='search' size={24} />
            }
        },
        postImage : {
            screen : PostImage,
            navigationOptions : {
                tabBarIcon : <Icon name="plus" size={24} />
            }
        },
        profile : {
            screen : Profile,
            navigationOptions:{
                tabBarIcon : <Icon name="user" size={24} />
            }
        }        
    },
    {
        tabBarPosition : "bottom",
        tabBarOptions:{
            showIcon:true,
            pressColor:true,
            showLabel : false,
            style:{backgroundColor : "white", borderTopWidth:0.7, borderTopColor:"gray"},
            indicatorStyle:{opacity : 0},
        }
    }

))

export default MainTab