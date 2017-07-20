import { 
    SHOW_QUOTA 
} from '../constants/actionTypes'


const initialState = {
    name:'慢慢来哈',
    cardPhone:'13800138000'
}


const customerInfo = (state = initialState , actions) => {
    switch(actions.type){
        case SHOW_QUOTA :
            return actions.quotaInfo
        default :
            return state
    }
}

export default customerInfo