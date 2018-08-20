import { takeLatest, put, call} from 'redux-saga/effects';
import { LOGOUT_PRESSED,} from 'containers/UserActions/constants';
import {LOAD_PROFILE } from './constants';
import { logout, login, authChecked } from './actions';
import firebase from 'firebase';


//For if still logged in from previous session, then update profile.
//Also for if profile is updated...tbh REALLY feeling like wanting to integrate react-redux-firebase in this.
//not needed. 
function* retrieveProfile(payload){

    const loggedIn = payload.uid;

    console.log("retrieving profile of", loggedIn);
    const userRef =  firebase.firestore().collection("users").doc(loggedIn);

    //retrieves document info.
    const doc = yield userRef.get()

    yield put(login(doc.data()));
    yield put(authChecked());



}

function* logOutCall(){



    yield firebase.auth().signOut()
        .then(res => {

            console.log("signed out", res);

        })
        .catch(err => {
            
            console.log("err",err);
        });
    

    console.log("current user from saga after signout yield",firebase.auth().currentUser);

    yield put(logout());

}

export default function* appSaga(){

    yield takeLatest(LOGOUT_PRESSED, logOutCall );
    yield takeLatest(LOAD_PROFILE, retrieveProfile);

}