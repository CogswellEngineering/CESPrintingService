import { fromJS} from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import {

    UPDATE_FAILED,
    UPDATE_SUCCESS,
    LEAVE_FORM,
} from './constants';

const initialState = fromJS({

    //Only thing is can't clear this once typing, only once updated. But that's fine.
    error:"",
    updated:false,

});


export default function updateOrderFormReducer(state=initialState, action){

    switch(action.type){

        case UPDATE_SUCCESS:
            console.log("setting updated to true");
            return state
                .set("updated",true);
        case UPDATE_FAILED:

            return state
                .set("error",action.error);

        case LEAVE_FORM:
            
            return state
                .set("updated",false);

        default:

            return state;
    }


}
