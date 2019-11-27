import React, { Component } from 'react'
import { View, Alert, AsyncStorage } from 'react-native'
import {Text, Input, Button} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import { element } from 'prop-types';
import urlApi from '../support/urlApi'
import Axios from 'axios';
import {connect} from 'react-redux' 
import {onRegisterSucess} from '../redux/action/users'
import { StackActions,NavigationActions } from 'react-navigation';

class login extends Component {
    
    state ={
        look : true,
        username : '',
        password : '',
        loading_btn : false
    }
    

    onBtnLogin = () =>{
        this.setState({loading_btn: true})
        const {username, password} = this.state
        if(username && password){
        Axios.post("https://apiinstagrinjc.herokuapp.com/auth/login",{
            username, password
        }).then(res=>{
            console.log(res.data)
            if(res.data.error){
                return Alert.alert(res.data.error)
            }
            let {email,username,id} = res.data.data[0]
            AsyncStorage.setItem('data', JSON.stringify({email,username,id}), (err) =>{
                if(err) return alert(err.message)
                this.props.onRegisterSucess({email,username, id})
                Alert.alert(res.data.message)
            })        
        })
        }else{
            Alert.alert("Isi Semua Form")
        }
    }
    componentDidUpdate(){
        if(this.props.user){
            const reset_stack = StackActions.reset({
                index : 0,
                actions : [NavigationActions.navigate({routeName:'home'})]
            })
            this.props.navigation.dispatch(reset_stack)
        }
    }

    render() {
        return (
            <View style={{flex:1, justifyContent :"center", paddingHorizontal:20}}>
                <Text h3 style={{alignSelf:"center", }}> MyInsta </Text>
                <View style={{marginTop:30}}>
                <Input
                    placeholder='Email / Username'
                    onChangeText ={text => this.setState({username : text})}
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
                    onChangeText ={text => this.setState({password : text})}
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
                        onPress={this.onBtnLogin}
                        loading_btn ={this.state.loading_btn}
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

const mapStateToProps = (state) => {
    return{
        user : state.Users.username,

    }
}
export default connect(mapStateToProps,{onRegisterSucess})(login) 