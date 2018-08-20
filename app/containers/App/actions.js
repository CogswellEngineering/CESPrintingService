import { APP_LOADED, LOAD_PROFILE, AUTH_CHECKED, LOGIN, LOGOUT} from './constants';


function authChecked(){

    return {

        type: AUTH_CHECKED,
    }
}

function loadProfile(uid){

    return {
        type:LOAD_PROFILE,
        uid,
    }
}

function login(loggedInProfile){

    return {

        type: LOGIN,
        loggedInProfile,
    }
}

function logout(){

    return {

        type: LOGOUT,
        
    }
}

function appLoaded(){


    return  {
        
        type: APP_LOADED,
    };

}

export {
    appLoaded,
    loadProfile,
    authChecked,
    login,
    logout,
};