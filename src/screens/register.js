import React, { Component } from 'react'
import { View } from 'react-native'
import {Text, Input, Button} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import Axios from 'axios';

export default class register extends Component {
    
    state ={
        look : true,
        username: '',
        password : '',
        email : '',
        confim_password : '',
        username_available : null
    }
    
    onCheckUsername =()=>{
        Axios.post('https://apiinstagrinjc.herokuapp.com/auth/check-username',{
            username : this.state.username
        }).then(res=>{
            if(res.data.error){
                return null
            }
            this.setState({username_available:res.data.available})
        })
    }

    render() {
        return (
            <View style={{flex:1, justifyContent :"center", paddingHorizontal:20}}>
                <Text h3 style={{alignSelf:"center", }}> MyInsta </Text>
                <View style={{marginTop:30}}>
                <Input
                    placeholder='Username'
                    onChangeText={(username) => this.setState({username})}
                    onBlur={this.onCheckUsername}
                    rightIcon={
                        this.state.username_available == null ? null
                        : this.state.username_available === true ? 
                        <Icon 
                            name="check"
                            size={20}
                            color="green"
                            style={{paddingLeft:10}}

                        /> :
                        <Icon 
                            name='times'
                            size={24}
                            color='red'
                            style={{paddingLeft:10}}
                        />
                    }
                    leftIcon={
                        <Icon
                        name='user'
                        size={24}
                        color='black'
                        style={{
                            paddingRight:10
                        }}
                        />
                    }
                    />

                </View>
                <View style={{marginTop:15}}>
                <Input
                    placeholder='Email'
                    onChangeText={(email) => this.setState({email})}
                    leftIcon={
                        <Icon
                        name='envelope'
                        size={24}
                        color='black'
                        style={{
                            paddingRight:8
                        }}
                        />
                    }
                    />

                </View>
                <View style={{marginTop:15}}>
                <Input
                    secureTextEntry={this.state.look}
                    placeholder='Password'
                    type='password'
                    onChangeText={(password) => this.setState({password})}
                    leftIcon={
                        <Icon
                        name='lock'
                        size={24}
                        color='black'
                        style={{
                            paddingRight:15
                        }}
                        />
                    }
                    rightIcon={
                        <Icon
                        name='eye'
                        size={24}
                        color='black'
                        style={{
                            paddingRight:15
                        }}
                        onPress={()=> this.setState({look : !this.state.look})}
                        />
                    }
                    />

                </View>
                <View style={{marginTop:15}}>
                <Input
                    secureTextEntry={true}
                    placeholder='Confirm Password'
                    onChangeText={(confim_password) => this.setState({confim_password})}
                    errorMessage={
                        (this.state.confim_password !== '') && (this.state.confim_password !== this.state.password)
                        ? 
                        'password tidak sama' 
                        : null
                    }
                    leftIcon={
                        <Icon
                        name='lock'
                        size={24}
                        color='black'
                        style={{
                            paddingRight:15
                        }}
                        />
                    }
                    />

                </View>
                    <View style={{ marginTop:20}}>
                    <Button
                        title="Login"
                        />

                    </View>

                    <View style={{ flexDirection:"row", marginTop:10,}}>
                        <View style={{flex:1}}>
                        <Button
                            icon={
                                <Icon 
                                    name="google"
                                    size={25}
                                    color="white"
                                />
                            }
                            buttonStyle={{backgroundColor:'red', marginRight:5}}
                            />

                        </View>
                        <View style={{flex:1}}>
                        <Button
                            icon={
                                <Icon 
                                    name="facebook"
                                    size={25}
                                    color="white"
                                />
                            }
                            buttonStyle={{backgroundColor:'blue',marginLeft:5}}
                            />

                        </View>
                    </View>
                    <View style={{flexDirection:"row",  marginTop:15, justifyContent:"center"}}>
                        <Text h5 style={{alignSelf:"center"}}>  Do you have account ?  </Text>
                        <Text style={{fontWeight:"bold"}}>Login</Text>
                    </View>

                </View>
        )
    }
}
