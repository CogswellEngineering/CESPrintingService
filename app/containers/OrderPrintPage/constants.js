const PREFIX = 'cesprintingservice/OrderPrintPage';


//actions for queue
const QUEUE_UPDATED = PREFIX + "/QUEUE_UPDATED";
const PAGE_TURNED = PREFIX + "/PAGE_TURNED";


const PRINT_ORDER = PREFIX +"/PRINT_ORDER";
const PRINT_ORDER_FAILED = PREFIX +"/PRINT_ORDER_FAILED";
const PRINT_ORDER_SUCCESS = PREFIX + "/PRINT_ORDER_SUCCESS";
const PRINT_CANCELLED = PREFIX + "/PRINCE_CANCELLED";
//Will decide if site constant or just on this page later for queue, regardless will just port the stuff needed to siteconstant instead.

const PRINTER_INFO_UPDATED = PREFIX + "PRINTER_INFO_UPDATED";


//This is called when url it is uploaded to sketchfab and we get url
const MODEL_RENDERING = PREFIX + "/MODEL_RENDERING";
//This is called when model viewer is done rendering it.
const MODEL_RENDERED = PREFIX + "/MODEL_RENDERED";
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
    MODEL_RENDERED,
    MODEL_RENDERING,
    PAGE_TURNED,
    PRINTER_INFO_UPDATED,
};