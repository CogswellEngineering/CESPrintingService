import {fromJS} from 'immutable';
import { takeLatest, put, call} from 'redux-saga/effects';
import firebase from 'firebase';
import { PRINT_ORDER, MODEL_UPLOADED} from './constants';
import request from 'utils/request';
var fileDownload = require('js-file-download');

import {
    
    orderFailed,
    orderSuccess,
    modelRendering,
} from './actions';

//this should be in json file or another file, REMINDER TO MAKE THAT CHANGE, will prob do once update url to domain name.
const fbAdminAPI = "http://localhost:5000";

function* orderPrintCall(action){

    console.log("action in order print call",action);
    

    try{



        

        //Sends post request to my back-end server.
        const response = yield call(request, fbAdminAPI + "/order_print", {

            method:"POST",
            body: action.printInfo,
        });

        if (response != null){

           //const body = yield call(response.json);


          

           //The body returned is basically the reciept
           yield put (orderSuccess(response));

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

function* previewModel(payload){


    console.log("here");
    const filePath = "../../ModelHolder/"+payload.model.name
    const formData = new FormData();
    formData.append("model",  payload.model);
    const response = yield call(request,"/previewModel", {

        method: "POST",
        body: formData
        
    });

    console.log("response", response);

    

    //Instead of sketchfab api url, will use url of this path isntead.
    yield put(modelRendering(response.filePath));

}


function* orderPrintWatcher(){

    yield takeLatest(MODEL_UPLOADED, previewModel)
    yield takeLatest(PRINT_ORDER, orderPrintCall);
}

export default orderPrintWatcher;

