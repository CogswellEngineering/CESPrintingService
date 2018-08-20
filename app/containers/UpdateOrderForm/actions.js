import {

    UPDATE_ORDER,
    UPDATE_FAILED,
    UPDATE_SUCCESS,
    LEAVE_FORM,
} from './constants';



function leaveForm(){


    return{
        type:LEAVE_FORM,
    };
}

function updateOrder(update){

    return {
        type: UPDATE_ORDER,
        update,
    };

}

function updateFailed(error){

    return {
        type: UPDATE_FAILED,
        error,
    };
}

function updateSuccess(){

    return {
        type:UPDATE_SUCCESS,
    };
}

export{
    updateOrder,
    updateFailed,
    updateSuccess,
    leaveForm,
};