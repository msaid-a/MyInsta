import React, { Component } from 'react';
import { View,ScrollView, ActivityIndicator } from 'react-native';
import {Header,Left,Body,Icon,Container,Right} from 'native-base'
import {Avatar,Text,Image} from 'react-native-elements'
import {api} from '../support/urlApi'

class detailProfile extends Component {
    
    state={
        data : null
    }


    componentDidMount(){
     let data = this.props.navigation.getParam('data')
        this.setState({data})
    }

    renderData = () =>{
        return this.state.data.map(val =>{
         return(   <View style={{width:`${100/3}%`,height:120,}}>
                        <Image 
                                source={{uri : api+ `/${val.foto_url}`}}
                                style={{ width: '100%',height:'100%'}}
                            />
                    </View>)
        })
    }
    
    render() {
        if(this.state.data === null){
            return (
                <View style={{justifyContent:"center", alignItems:"center"}}>
                    <ActivityIndicator size='large'/>
                </View>
            )
        }
        return (
            <View>
                <Header style={{backgroundColor:"white"}}> 
                    <Left>
                            <Icon name='arrow-back' onPress={()=> this.props.navigation.goBack()} />
                    </Left>
                    <Body>
                        <Text>{this.state.data[0].username}</Text>
                    </Body>
                    <Right>
                    </Right>
                </Header>

                {/* User Photo */}
                <View style={{height : 100,flexDirection:'row',paddingHorizontal:15,marginTop:20 }}>
                    <View style={{flex:1 ,}}>
                        <Avatar
                            containerStyle={{borderWidth:3,borderColor:'gray'}}
                            size={100}
                            rounded
                            source={{
                                uri:api + `/public/profile/default.png`,
                            }}
                            />
                    </View>
                    <View style={{flex:1 , justifyContent:'center',alignItems:'center'}}>
                        <Text h4>{this.state.data.length}</Text>
                        <Text>Posts</Text>
                    </View>
                    <View style={{flex:1 , justifyContent:'center',alignItems:'center'}}>
                        <Text h4>1k</Text>
                        <Text>Followers</Text>
                    </View>
                    <View style={{flex:1 , justifyContent:'center',alignItems:'center'}}>
                        <Text h4>2k</Text>
                        <Text>Following</Text>
                    </View>
                </View>

                {/* user info */}
                <View style={{marginTop:15,paddingHorizontal:15}}>
                    <Text style={{fontWeight:'bold'}}> {this.state.data[0].username} </Text>
                    <Text> User Bio </Text>
                </View>

            {/* POSt */}
                    <ScrollView style={{borderTopWidth:1,borderTopColor:'grey',marginTop:50}}>
                        <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                            {this.renderData()}
                        </View>
                 </ScrollView>
                </View>

        )
    }
}

export default detailProfile