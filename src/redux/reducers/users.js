const users = {
    email : '',
    username : '',
    profilePict : ''
}

const userReducer = (state = users, action) =>{
    if(action.type === 'REGISTER_SUCCESS'){
        return action.payload
    }else{
        return state
    }
}

export default userReducer