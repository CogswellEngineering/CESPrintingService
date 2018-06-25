import {

    PRINT_ORDER,
    PRINT_ORDER_FAILED,
    PRINT_ORDER_SUCCESS,
    PRINT_CANCELLED,
} from './constants';


function orderedPrint(printInfo){

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
};