import { fromJS} from 'immutable';
import { APP_LOADED, AUTH_CHECKED, LOGIN, LOGOUT} from './constants';
import firebase from 'firebase';

//Actually don't even need 
const initialState = fromJS({

    loggedInUser: { isEmpty: true,},
    firebase:null,
    authChecked: false,
    
});


export default function appReducer(state = initialState, action){


    switch(action.type){

        case AUTH_CHECKED:

            return state
                .set("authChecked",true);

        case LOGIN:
            console.log("action",action);
            action.loggedInProfile.isEmpty = false;
            return state
                .set("loggedInUser", action.loggedInProfile);

        case LOGOUT:


            
           
            const loggedOutProfile = {
                isEmpty:true,
            }
        
        //Should have ref so don't need to firebase.
            return state
                .set("loggedInUser",loggedOutProfile);

        case APP_LOADED:

            console.log("hello");
            return state
                .set("firebase",firebase);


        default:

            return state;
    }


}