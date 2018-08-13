const prefix = "ces/ReceiptPage";


const ORDER_LOADED = prefix + "ORDER_LOADED";
//Confirm order is when they finished filling out card information and submit that.
//This is call to saga to send token to my server to actually make the charge.
const CONFIRM_ORDER = prefix + "CONFIRM_ORDER";

//This is after get response from server that order has been confirmed, also after update db, I'll do that in same body
//Could separate but then need another action, to signify that that has been done.
const ORDER_CONFIRMED = prefix + "ORDER_CONFIRMED";

const ORDER_FAILED = prefix + "ORDER_FAILED";
//Okay, after looking at stripe I see what saga would need.
const ORDER_CANCELLED = prefix + "ORDER_CANCELLED";


export{

    ORDER_LOADED,
    CONFIRM_ORDER,
    ORDER_CONFIRMED,
    ORDER_CANCELLED,
    ORDER_FAILED,
}