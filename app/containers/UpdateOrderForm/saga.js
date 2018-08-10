import {takeLatest, put, call} from 'redux-saga/effects'
import request from 'utils/request';
//For user.
import firebase from 'firebase';
import {

    UPDATE_ORDER,
    
} from './constants';

import {

    updateFailed,
    updateSuccess,

} from './actions';

const fbAdminAPI = "http://localhost:5000";

function* updateOrderInfoCall(action){

    const update = action.update;

    //Adds orderer field to update to match the order with user.
    update.orderer = firebase.auth().currentUser;

    try{
        const response = yield call(request, {

            method: "POST",
            body: update,
        });

        if (response.error){

            yield put(updateFailed(response.error));
        }
        else{
            
            yield put(updateSuccess());
        }

    }
    catch (err ){

        console.log(err);

        yield put(updateFailed("Failed to update. Please try again or contact us at cogswellengineeringsociety@gmail.com"));
    }

}

export default function* updateOrderFormSaga(){

    yield takeLatest(UPADTE_ORDER,updateOrderInfoCall );
}