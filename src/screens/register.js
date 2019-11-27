import React, { Component } from 'react'
import { View, Alert, AsyncStorage, ActivityIndicator } from 'react-native'
import {Text, Input, Button} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import Axios from 'axios';
import {api} from '../support/urlApi'
import {connect} from 'react-redux'
import {onRegisterSucess} from '../redux/action/users'
import {StackActions, NavigationActions} from 'react-navigation'
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin'
import { throwStatement } from '@babel/types';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
const webID = '320649701465-rp9t5k9bg346t7olhh6rdidjurbfit47.apps.googleusercontent.com'

class register extends Component {
    
    state ={
        look : true,
        username: '',
        password : '',
        email : '',
        confim_password : '',
        username_available : null,
        loadingCheckUsername : null,
        loadingButtonRegister : false,
        check_storage : false
    }
    
    onCheckUsername =()=>{
        Axios.post(api+'/auth/check-username',{
            username : this.state.username
        }).then(res=>{
            if(res.data.error){
                return null
            }
            this.setState({username_available:res.data.available})
        })
    }

    signIn = async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          const date = new Date()
          const data = {
              username : userInfo.user.familyName,
              email : userInfo.user.email,
              created_at : `${date.getDate()}-${date.getMonth()}-${date.getFullYear().toString().slice(-2)} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}` 
          }
        } catch (error) {
          console.log(error)
        }
      };

    onRegister = () =>{
        this.setState({loadingButtonRegister:true})
        let {username, password, email,confim_password} = this.state
        let date = new Date()
        if(username && password && email){
            if(password !== confim_password){
                this.setState({loadingButtonRegister:false})
                return Alert.alert('Password tidak sama')
            }
            Axios.post(api+'/auth/register',{
                username,password,email,
                created_at : `${date.getDate()}-${date.getMonth()}-${date.getFullYear().toString().slice(-2)} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}` 
            }).then(res =>{
                if(res.data.error){
                    Alert.alert(res.data.message)
                     this.setState({loadingButtonRegister:false})

                }else{
                    this.setState({loadingButtonRegister:false})
                    AsyncStorage.setItem('data', JSON.stringify({email,username,id}), (err) =>{
                        if(err) return alert(err.message)
                        this.props.onRegisterSucess({email,username,id})
                        Alert.alert(res.data.message)
                    })
                }
            })
        }else{
            Alert.alert('Harus Di isi semua')
            this.setState({loadingButtonRegister:false})
        }
    }

    componentDidMount(){
        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
            webClientId: webID, 
            offlineAccess: true, 
            hostedDomain: '', 
            loginHint: '', 
            forceConsentPrompt: true, 
            accountName: '', 
          })
        AsyncStorage.getItem('data')
            .then((data)=>{
                if(data){
                    const obj_data = JSON.parse(data)
                    console.log(obj_data)
                    this.props.onRegisterSucess(obj_data)
                    this.setState({check_storage:true})
                    console.log(obj_data)
                }
                this.setState({check_storage:true})

            }).catch(err=>{
                console.log(err)
            })
    }

    initUser = (token) =>{
        console.log('masuk')

        fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token)
        .then((response) => response.json())
        .then((json) => {
          // Some user object has been set up somewhere, build that user here
          console.log(json)      
        //   user.name = json.name
        //   user.id = json.id
        //   user.user_friends = json.friends
        //   user.email = json.email
        //   user.username = json.name
        //   user.loading = false
        //   user.loggedIn = true
        //   user.avatar = setAvatar(json.id)
        })
        .catch(() => {
          console.log('ERROR GETTING DATA FROM FACEBOOK')
        })
      }

    componentDidUpdate(){
        if(this.props.user){
            const reset_stack = StackActions.reset({
                index:0,
                actions:[NavigationActions.navigate({routeName : 'home'})]
            })
            this.props.navigation.dispatch(reset_stack)
        }
    }

    render() {
        if(this.state.check_storage === false){
            return(
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}> 
                    <Text h2>
                        MyInsta
                    </Text>
                    <ActivityIndicator size='small' />
                </View>
            )
        }
        return (
            <View style={{flex:1, justifyContent :"center", paddingHorizontal:20}}>
                <Text h3 style={{alignSelf:"center", }}> MyInsta </Text>
                <View style={{marginTop:30}}>
                <Input
                    placeholder='Username'
                    onChangeText={(username) => this.setState({username})}
                    onBlur={this.onCheckUsername}
                    rightIcon={
                        this.state.username_available == null && this.state.username=='' ? null
                        : this.state.username_available === true && this.state.username !== ''? 
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
                        title="Register"
                        loading={this.state.loadingButtonRegister}
                        onPress={this.onRegister}
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
                            onPress ={this.signIn}
                            buttonStyle={{backgroundColor:'red', marginRight:5}}
                            />

                        </View>
                        <View style={{flex:1}}>
                        {/* <Button
                            icon={
                                <Icon 
                                    name="facebook"
                                    size={25}
                                    color="white"
                                />
                            }
                            buttonStyle={{backgroundColor:'blue',marginLeft:5}}
                            /> */}
                                {/* <LoginButton
                                publishPermission={["public_actions"]}
                                readPermission={["public_profile"]}
            onLoginFinished={
                (error, result) => {
                if (error) {
                    console.log("login has error: " + result.error);
                } else if (result.isCancelled) {
                    console.log("login is cancelled.");
                } else {
                    AccessToken.getCurrentAccessToken().then(
                    (data) => {
                        console.log(data.accessToken.toString())
                    }
                    )
                }
                }
            }
            style={{height:40}}
            onLogoutFinished={() => console.log("logout.")}/> */}

<LoginButton
  publishPermissions={['publish_actions']}
  readPermissions={['public_profile']}
  onLoginFinished={
      (error, result) => {
        console.log('masuk')
        if (error) {
        console.log(error)
      } else if (result.isCancelled) {
        console.log('login is cancelled.')
      } else {
        AccessToken.getCurrentAccessToken().then((data) => {
        console.log(data)
          const { accessToken } = data
          this.initUser(accessToken)
        })
      }
    }
  }
  onLogoutFinished={"haha"} />


                        </View>
                    </View>
                    <View style={{flexDirection:"row",  marginTop:15, justifyContent:"center"}}>
                        <Text h5 style={{alignSelf:"center"}}>  Do you have account ?  </Text>
                        <Text style={{fontWeight:"bold"}} onPress={()=>this.props.navigation.navigate('login')}>Login</Text>
                    </View>

                </View>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        user : state.Users.email,

    }
}
export default connect(mapStateToProps,{onRegisterSucess})(register) 

