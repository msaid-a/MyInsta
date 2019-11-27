import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker';
import {connect} from 'react-redux'
import { Input, Button } from 'react-native-elements';
import Axios from 'axios';
import { api } from '../support/urlApi';

 class postImage extends Component {

    state={
        image : null,
        caption : ''
    }

    openCamera = () =>{
        ImagePicker.openCamera({
            width: 300,
            height: 300,
            cropping: true
          }).then(image => {
            this.setState({image})
          });
    }

    onButtonPresh = () =>{
        let fd = new FormData()
        let image = {
            name : this.props.user + '.' + this.state.image.mime.split('/')[1],
            type : this.state.image.mime,
            uri : this.state.image.path

        }
        console.log(image)

        fd.append('image',image)
        let data = {
            caption : this.state.caption,
            username : this.props.user,
            id_user : this.props.id
        }

        data = JSON.stringify(data)
        fd.append('data',data)
        Axios.post(api + '/post/addpost',fd, {headers : {'Content-Type': 'multipart/form-data' }})
            .then(res=>{
                console.log(res.data)
            }).catch(err => {
                console.log(err)
            })
    }


    render() {
        return (
            <View>
                <Text onPress={this.openCamera}> Camera </Text>
                <Text> Galery </Text>
                <Image 
                    source={{uri : this.state.image === null ? null : this.state.image.path}}
                    width={300}
                    height={300}
                />
                <Input 
                    placeholder="Caption"
                    onChangeText={(text)=> this.setState({caption:text})}
                />
                <Button 
                    title='Post'
                    buttonStyle={{marginTop:20}}
                    onPress={this.onButtonPresh}
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        user : state.Users.username,
        id : state.Users.id
    }
}
export default connect(mapStateToProps)(postImage)