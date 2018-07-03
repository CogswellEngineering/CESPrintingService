import {LOGOUT_PRESSED} from './constants';


export function logoutPressed(){

    return {
        type : LOGOUT_PRESSED,
    }
}
//ToAdd: Add enteredProfile actionCreator here, and that one will need
//saga that will make call to get all the information in profile for user.
