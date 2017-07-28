import { 
    SHOW_QUOTA 
} from '../constants/actionTypes'


const initialState = {
    name:'',
    cardPhone:''
}


const customerInfo = (state = initialState , actions) => {
    switch(actions.type){
        case SHOW_QUOTA :
            return Object.assign({}, state, {
                userName: payload
            });
        default :
            return state
    }
}

export default customerInfo