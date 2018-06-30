import {fromJS} from 'immutable';
import { takeLatest, put, call} from 'redux-saga/effects';
import firebase from 'firebase';
import { PRINT_ORDER,} from './constants';
import request from 'utils/request';

import {
    
    orderFailed,
    orderSuccess,
} from './actions';

const fbAdminAPI = "http://localhost:5000";

function* orderPrintCall(action){

   


    try{


        //Sends post request to my back-end server.
        const response = yield call(request, fbAdminAPI + "/order_print", {

            method:"POST",
            body: JSON.stringify(action),
        });

        if (response != null){

           const body = yield call(response.json());


           if (body == null){
               throw new Error("body null");
           }

           console.log(body);

           //The body returned is basically the reciept

           yield put (orderSuccess(body));

        }
        else{
            throw new Error("response null");
        }
    }
    catch (err ){

        console.log(err);
        yield put(orderFailed("Failed to order your print. Please try again later."));
    }


}

function* orderPrintWatcher(){

    yield takeLatest(PRINT_ORDER, orderPrintCall);
}

export default orderPrintWatcher;

