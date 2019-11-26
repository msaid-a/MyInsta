import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import { Image, Avatar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class post extends Component {
    render() {
        return (
            <View style={{marginVertical:25}}>
            <View style={{flexDirection:"row", marginTop:20, paddingHorizontal:10, paddingVertical:8, justifyContent : "space-between", marginVertical:20}}>
                <View style={{flexDirection:"row"}}>
                    <Avatar
                        rounded
                        source={{
                            uri:this.props.avatarUrl,
                        }}
                        />
                    <Text style={{fontWeight:"bold", fontSize:20, marginLeft:10}}>{this.props.username}</Text>
                </View>
                <View style={{alignSelf:"center"}}>
                    <Icon 
                        name='ellipsis-v'
                        size={20}
                    />
                </View>
            </View>
            <View style={{width:'100%', height:400}}>
                <Image
                    source={{ uri: this.props.postUrl }}
                    style={{ width: '100%', height:'100%' }}
                    />
            </View>
            <View style={{paddingTop:10, paddingHorizontal:10, flexDirection:"row"}}>
               <View style={{flexDirection:"row"}}>
                    <View style={{flexDirection:"row"}}>
                        <Icon
                            name='heart-o'
                            size={30}
                            color="balck"
                            />
                        <Text style={{marginLeft:5,marginTop:3 ,fontWeight:"bold", fontSize:15}}> likes</Text>   

                    </View>
                    <View style={{marginLeft:4}}>
                        <Icon
                        name='bookmark-o'
                        size={25}
                        color="balck"
                        />
                    </View>
                </View> 

            </View>
            <View style={{paddingHorizontal:10}}>
                <Text style={{fontSize:15}}><Text style={{fontWeight:"bold"}}>{this.props.username}</Text> <Text>{this.props.caption}</Text></Text>
             
            </View>
          
        </View>
        )
    }
}
