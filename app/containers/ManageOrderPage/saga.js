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

    

    try{
        console.log("payload", payload);
        //It's generic enough to work with anyth    ing, nice.
        const response = yield call(request, fbAdminAPI+"charge",{

            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload),

        });

        console.log("response", response);

        if (response.status == "succeeded"){

            console.log("order success");
            console.log("stripe token", payload.stripeToken);

            //So need to pass in receipt. Prob using both token information and order.
            yield put(orderConfirmed());
        }
        else{

            console.log("order failed");

            yield put(orderFailed(response.error));  

        }
    }
    catch(err){

        console.log("order failed");

        console.log("error",err);

        yield put(orderFailed("An error has occured. Please try again."))
    }


}

function* cancelOrder(){

    //Need chargeID for this. Will be something need to add to object in DB.
}

export default function* manageOrderSaga(){

    yield takeLatest(CONFIRM_ORDER, chargeOrder);
}



