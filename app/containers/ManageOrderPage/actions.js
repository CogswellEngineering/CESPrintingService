import {

    ORDER_LOADED,
    CONFIRM_ORDER,
    ORDER_CONFIRMED,
    ORDER_CANCELLED,
    ORDER_FAILED,
} from './constants';


function orderLoaded(order){

    return {
        type: ORDER_LOADED,
        order,
    }
}

function confirmOrder(order, stripeToken){

    console.log("stripe token", stripeToken);
    return {

        type: CONFIRM_ORDER,
        //Sending whole order object, because need to pass in cost as well.
        order,
        stripeToken,
    };

}


//Passed in is orderID, and payment information 
//Actually, before go further look into stripe api, cause technically. I shouldn't
//have access to payment info lol.
function orderConfirmed(receipt){

    return {
        type: ORDER_CONFIRMED,
        receipt,
    };
}

function orderFailed(error){

    return {
        type: ORDER_FAILED,
        error,
    };
}

function orderCancelled(){

    return {
        type: ORDER_CANCELLED,
    };
}

export{

    orderLoaded,
    confirmOrder,
    orderConfirmed,
    orderCancelled,
    orderFailed,
};