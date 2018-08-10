import { fromJS} from 'immutable';

import {

    UPDATE_FAILED,
    UPDATE_SUCCESS,
} from './constants';

const initialState = fromJS({

    //Only thing is can't clear this once typing, only once updated. But that's fine.
    error:"",
    updated:false,

});


export default function updateOrderFormReducer(state=initialState, action){

    switch(action.type){

        case UPDATE_SUCCESS:
            
            return state
                .set("updated",true);
        case UPDATE_FAILED:

            return state
                .set("error",action.error);
            
    }


}
