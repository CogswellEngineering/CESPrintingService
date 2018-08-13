import {takeLatest, put, call} from 'redux-saga/effects';
import request from 'utils/request';

import {
    orderConfirmed,
    orderFailed,
}
from './actions';

import {
    CONFIRM_ORDER,
    ORDER_CANCELLED,
} from './constants';

const fbAdminAPI = "http://localhost:5000/";

function* chargeOrder(payload){

    

    //It's generic enough to work with anything, nice.
    const response = yield call(request, fbAdminAPI+"/charge",{

        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload),

        
    });

    if (response.error){

        yield put(orderFailed(response.error));
    }
    else{

        yield put(orderConfirmed());

    }


}

function* cancelOrder(){

    //Need chargeID for this. Will be something need to add to object in DB.
}

export default function* receiptSaga(){

    yield takeLatest(CONFIRM_ORDER, chargeOrder);
}



