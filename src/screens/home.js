import React, { Component } from 'react'
import { Text, View, ScrollView, ActivityIndicator } from 'react-native'
import { Image, Avatar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import Post from '../component/post'
import Axios from 'axios'
import {api} from '../support/urlApi'



export default class home extends Component {
    state={
        data : null
    }
    componentDidMount = () =>{
        Axios.get(api+'/post/getallpost')
            .then(res=>{
                console.log(api)
               this.setState({data:res.data.data})
            })
    }

    renderPost = () =>{
        return this.state.data.map(val => {
            return(
                <Post avatarUrl={api + `/public/profile/default.png`} username={val.username} caption={val.caption} postUrl={api+ `/${val.foto_url}`}/>
            )
        })
    }

    render() {
        if(this.state.data === null){
            return(
                <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
                    <ActivityIndicator size='large'/>
                </View>
            )
        }
        return (
            <View>
               <ScrollView>
                    {this.renderPost()}
               </ScrollView>
            </View>
        )
    }
}
