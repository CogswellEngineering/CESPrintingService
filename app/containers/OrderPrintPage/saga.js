import {fromJS} from 'immutable';
import { takeLatest, put, call} from 'redux-saga/effects';
import firebase from 'firebase';
import { PRINT_ORDER, MODEL_UPLOADED} from './constants';
import request from 'utils/request';

import {
    
    orderFailed,
    orderSuccess,
    modelRendering,
} from './actions';

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

           const body = yield call(response.json);


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

function* sketchFabAPICall(action){

    console.log("action",action);

    const model = action.model;
    //Need to generate new id
    const sketchFabURL = "https://sketchfab.com/v3/models";

    const formData = new FormData();

    formData.append("model",model);

    //Will send a post request to server that will handle the actual uploading and 
    try{
        
        const response = yield call(request,"http://localhost:5000/preview_model",{

            method: "POST",
            
            body: formData,
        });

        console.log("response body", response);
        console.log("this should've waited");
        yield put (modelRendering(response.modelUrl));



    }
    catch(err){
        console.log(err);
        //Will dispatch an action that failed to load model, please try again. But tht's later.
        //SOON, but not now. Soon because this needs to be fucking done already.
    }

   
}

function* orderPrintWatcher(){

    yield takeLatest(MODEL_UPLOADED, sketchFabAPICall)
    yield takeLatest(PRINT_ORDER, orderPrintCall);
}

export default orderPrintWatcher;

