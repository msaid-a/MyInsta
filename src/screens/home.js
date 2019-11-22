import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import { Image, Avatar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

const data =[
    {username:'said', avatar:'https://cdn.iconscout.com/icon/free/png-256/avatar-380-456332.png ', url_foto:'https://images2.minutemediacdn.com/image/upload/c_crop,h_1188,w_2120,x_0,y_227/f_auto,q_auto,w_1100/v1554729678/shape/mentalfloss/58331-istock-479586616.jpg', caption : `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`, likes : 10 },
    {username:'asep', avatar:'https://cdn.iconscout.com/icon/free/png-256/avatar-380-456332.png ', url_foto:'https://ichef.bbci.co.uk/news/660/cpsprodpb/BEEB/production/_108557884_gettyimages-486237421.jpg', caption : `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`, likes : 10 },
    {username:'mamat', avatar:'https://cdn.iconscout.com/icon/free/png-256/avatar-380-456332.png    ', url_foto:'https://cdn.vox-cdn.com/thumbor/OO5I1Ux24dWm8zIvp41T4R-UzUQ=/0x0:2109x1137/1200x800/filters:focal(887x401:1223x737)/cdn.vox-cdn.com/uploads/chorus_image/image/61962353/GettyImages_493199410.0.jpg', caption : `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`, likes : 10 },
    {username:'hendry', avatar:'https://cdn.iconscout.com/icon/free/png-256/avatar-380-456332.png   ', url_foto:'https://cnet1.cbsistatic.com/img/PgbwyjrSBYG_pwKZeHPbQxnG98U=/1092x0/2019/10/16/9ee87309-945c-40da-9ecb-331a863f01c2/newc-yongqing-bao-wildlife-photographer-of-the-year-1.jpg', caption : `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`, likes : 10 },
    {username:'ujang', avatar:'https://cdn.iconscout.com/icon/free/png-256/avatar-380-456332.png    ', url_foto:'https://media.wired.com/photos/5bfde7b13ee8d605f3dd0edf/4:3/w_1040,h_780,c_limit/fallshow-01.jpg', caption : `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`, likes : 10 },
    {username:'febry', avatar:'https://cdn.iconscout.com/icon/free/png-256/avatar-380-456332.png    ', url_foto:'https://www.nationalgeographic.com/content/dam/animals/2019/10/loudest-bird-call/01-loudest-bird-call-214081.adapt.885.1.jpg', caption : `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`, likes : 10 },
]


export default class home extends Component {

    renderData = () =>{
        return data.map(data=>{
            return(
                <View>
                    <View style={{flexDirection:"row", marginTop:20, paddingHorizontal:10, paddingVertical:8, justifyContent : "space-between"}}>
                        <View style={{flexDirection:"row"}}>
                            <Avatar
                                rounded
                                source={{
                                    uri:data.avatar,
                                }}
                                />
                            <Text style={{fontWeight:"bold", fontSize:20, marginLeft:10}}>{data.username}</Text>
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
                            source={{ uri: data.url_foto }}
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
                                <Text style={{marginLeft:5,marginTop:3 ,fontWeight:"bold", fontSize:15}}>{data.likes} likes</Text>   

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
                        <Text style={{fontSize:15}}><Text style={{fontWeight:"bold"}}>{data.username}</Text> <Text>{data.caption}</Text></Text>
                     
                    </View>
                  
                </View>
            )
        })
    }

    render() {
        return (
            <View>
               <ScrollView>  
                        {this.renderData()}
               </ScrollView>
            </View>
        )
    }
}
