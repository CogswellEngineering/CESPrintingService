import { takeLatest, put, call} from 'redux-saga/effects';
import { LOGOUT_PRESSED} from 'containers/UserActions/constants';
import { logout } from './actions';
import firebase from 'firebase';

function* logOutCall(){



    yield firebase.auth().signOut()
        .then(res => {

            console.log("signed out", res);

        })
        .catch(err => {
            
            console.log("err",err);
        });
    

    console.log("current user from saga after signout yield",firebase.auth().currentUser);

  //  yield put(logout());

}

export default function* appSaga(){

    yield takeLatest(LOGOUT_PRESSED, logOutCall );

}