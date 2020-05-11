import decode from 'jwt-decode';

function validateToken(token){
    let exp_date = undefined;
    if(!token){
        token = localStorage.getItem('token');
    }
    try{
        exp_date = decode(token).exp
    } catch(e){
        localStorage.removeItem('token');
    }
    if (token && exp_date){
        if(exp_date < Date.now()/ 1000)
            localStorage.removeItem('token');
    }
    return token
}

const initialState = {
    token:validateToken()
}
   

export default function checkForToken(state = initialState,action){
    switch(action.type){
        case 'STORETOKEN':
            if(action.token && validateToken(action.token))
                localStorage.setItem('token',action.token)
                
            return Object.assign({},{token:action.token})
        case 'REMOVETOKEN':
            localStorage.removeItem('token',action.token)
            return state    
        default:
           return state;
    }
}