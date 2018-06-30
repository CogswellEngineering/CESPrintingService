const PREFIX = 'cesprintingservice/OrderPrintPage';


//actions for queue
const QUEUE_UPDATED = PREFIX + "/QUEUE_UPDATED";
const PAGE_TURNED = PREFIX + "/PAGE_TURNED";


const PRINT_ORDER = PREFIX +"/PRINT_ORDER";
const PRINT_ORDER_FAILED = PREFIX +"/PRINT_ORDER_FAILED";
const PRINT_ORDER_SUCCESS = PREFIX + "/PRINT_ORDER_SUCCESS";
const PRINT_CANCELLED = PREFIX + "/PRINCE_CANCELLED";
//Will decide if site constant or just on this page later for queue, regardless will just port the stuff needed to siteconstant instead.



const MODEL_UPLOADED = PREFIX + "/MODEL_UPLOADED";

//Field changed is general enough to be in global state of app, but for faster sake.
const FIELD_CHANGED = PREFIX + "/FIELD_CHANGED";

//Will have an event listener for updating the queue on page.

export{

    PRINT_ORDER,
    PRINT_ORDER_FAILED,
    PRINT_ORDER_SUCCESS,
    PRINT_CANCELLED,
    QUEUE_UPDATED,
    FIELD_CHANGED,
    MODEL_UPLOADED,
};