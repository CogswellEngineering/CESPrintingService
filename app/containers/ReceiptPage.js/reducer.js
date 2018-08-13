import { fromJS} from 'immutable';

import{

    ORDER_LOADED,
    ORDER_CONFIRMED,
    ORDER_FAILED,
} from './constants';

//Whether the card info is open will be handled in inner state.
//Pulling the order information will also be in inner state, just setting the state there.
//Should it be here? Actually, since using selector for it, I should put it here.
//Means need another action for order loaded.
const initialState = fromJS({

    error: "",
    orderInfo:null,
    orderConfirmed:false,

});

export default function receiptReducer(state = initialState, action){

    switch(action.type){

        case ORDER_LOADED:

            return state
                .set("orderInfo", action.order);

        case ORDER_CONFIRMED:

            return state
                .set("error","")
                .set("orderConfirmed", true);

        case ORDER_FAILED:

            return state
                .set("error", action.error);

        default:
            
            return state;
    }

}