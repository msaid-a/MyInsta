import React, { Component } from 'react'
import { View } from 'react-native'
import {Text, Input, Button} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class login extends Component {
    
    state ={
        look : true
    }
    
    render() {
        return (
            <View style={{flex:1, justifyContent :"center", paddingHorizontal:20}}>
                <Text h3 style={{alignSelf:"center", }}> MyInsta </Text>
                <View style={{marginTop:30}}>
                <Input
                    placeholder='Email / Username'
                    leftIcon={
                        <Icon
                        name='envelope'
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
                    secureTextEntry={this.state.look}
                    placeholder='Password'
                    type='password'
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
                        <Text h5 style={{alignSelf:"center"}}>  Dont Have Account ?  </Text>
                        <Text style={{fontWeight:"bold"}} onPress={()=> this.props.navigation.navigate('register')}>Click Here</Text>
                    </View>
                </View>
        )
    }
}
