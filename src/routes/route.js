import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import Login from '../screens/login'
import Register from '../screens/register'
import Home from '../screens/home'


const MainStack = createAppContainer(createStackNavigator(
    {
        login : Login,
        register : Register,
        home : Home
    },
    {
        initialRouteName : 'login',
        headerMode : 'none'
    }
))

export default MainStack