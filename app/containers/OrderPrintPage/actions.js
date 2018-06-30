import {

    PRINT_ORDER,
    PRINT_ORDER_FAILED,
    PRINT_ORDER_SUCCESS,
    PRINT_CANCELLED,
    QUEUE_UPDATED,
    PAGE_TURNED,
    FIELD_CHANGED,
    MODEL_UPLOADED,
} from './constants';


function pageTurned(page){

    return {
        type:PAGE_TURNED,
        page,
    };
}


function modelUploaded(model) {

    return {

        type: MODEL_UPLOADED,
        model,
    };
}

function fieldChanged(fieldName, value){

    return {
        type: FIELD_CHANGED,
        fieldName,
        value,
    };
}

function queueUpdated(queue){

    return {
        type: QUEUE_UPDATED,
        queue,
    };

}

function orderedPrint(uid, printInfo){

    return {
        type: PRINT_ORDER,
        printInfo,
    };

}

function orderFailed(error){
    
    return {
        type: PRINT_ORDER_FAILED,
        error,
    };
}

function orderSuccess(reciept){
    
    return {
        type: PRINT_ORDER_SUCCESS,
        reciept,
    };
}

function orderCancelled(){
   
    return {
        type:PRINT_CANCELLED,
    };
}

export {
    orderedPrint,
    orderFailed,
    orderSuccess,
    orderCancelled,
    queueUpdated,
    pageTurned,
    fieldChanged,
    modelUploaded,
};