export function storeToken(token) {
    return {
        type:'STORETOKEN',
        token
    }   
}

export function removeToken(){
    return {
        type:'REMOVETOKEN'
    }
}

export function userList(users) {
    return {
        type:'USERS_LIST',
        users
    }   
}