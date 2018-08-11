import {takeLatest, put, call} from 'redux-saga/effects'
import request from 'utils/request';
//For user.
import {

    UPDATE_ORDER,
    
} from './constants';

import {

    updateFailed,
    updateSuccess,

} from './actions';

const fbAdminAPI = "http://localhost:5000/";

function* updateOrderInfoCall(action){

    const update = action.update;
    console.log("update",update);

    //Instead of pop_queue, will be finish item.
    const path = "print-order-processed";

    try{
        const response = yield call(request, fbAdminAPI+path,{

            method: "POST",
            body: JSON.stringify(update),
            headers:{
                'Content-Type' : 'application/json',
            }
        });


        if (response.error){

            yield put(updateFailed(response.error));
        }
        else{
            console.log("Successful update.")
            yield put(updateSuccess());
        }

    }
    catch (err ){

        console.log(err);

        yield put(updateFailed("Failed to update. Please try again or contact us at cogswellengineeringsociety@gmail.com"));
    }

}

export default function* updateOrderFormSaga(){

    yield takeLatest(UPDATE_ORDER,updateOrderInfoCall );
}