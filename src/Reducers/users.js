const initialState = {
    users:null
}
   

export default function usersList(state = initialState, action){
    switch(action.type){
        case 'USERS_LIST':
            if(action.users)
                return Object.assign({},{users:action.users});
                break;  
        default:
           return state;
    }
}