import { APP_LOADED, AUTH_CHECKED, LOGIN, LOGOUT} from './constants';


function authChecked(){

    return {

        type: AUTH_CHECKED,
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
    authChecked,
    login,
    logout,
};