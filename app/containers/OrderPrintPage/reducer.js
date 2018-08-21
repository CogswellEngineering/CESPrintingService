import { fromJS} from 'immutable';
import {
    FIELD_CHANGED,
    PRINT_ORDER,
    PRINT_ORDER_FAILED,
    PRINT_ORDER_SUCCESS,
    PRINT_CANCELLED,
    QUEUE_UPDATED,
    PAGE_TURNED,
    MODEL_UPLOADED,
    MODEL_RENDERING,
    MODEL_RENDERED,
    PRINTER_INFO_UPDATED,
} from './constants';

import { LOCATION_CHANGE } from 'react-router-redux';



const initialState = fromJS({

    /*State fields related to the model queue*/
    queue:[], 

    //Okay, something is making this null upon ordering and it WASN'T happening before.
    printerState : null,
    //What's currently shown based on page.
    queueShown:[],
    currentPage:1,
    shownPerPage:3,

    ordering:false,
    //This kind of limits it, unless people know what they're doing, neeed to make screen for that case too.
    //Or if they have simplify3D then they can just upload that x3kg to us directly then only need color
    y:0,
    x:0,
    z:0,
    unit:"",
    color:"",
    material:"",
    
    //Will prob move this to different place later
    modelURL:"",
    renderingModel:false,


    //Print ready
    isPrintReadyModel:false,
    uploadedModel:null,
    receipt:null,
    error:"",

});


//For returning resulting sub array that will then be set to shown posts.
//This will be called when change page, and when total blog posts change.
function getShownQueue(page,queue,shownPerPage){


    var shownQueue = [];

    //Because posts on each page goes by posts per page
    const endingIndex = page * shownPerPage;

    var i = endingIndex - shownPerPage  ;

    for (; i < endingIndex && i < queue.length; ++i){

        shownQueue.push(queue[i]);
    }

    return shownQueue;


}


export default function orderPrintReducer(state = initialState, action){


    switch(action.type){


        case LOCATION_CHANGE:

            return initialState;

        /*Shown Queue Related actions*/

        


        case MODEL_RENDERING:
            console.log("this is for sure happening");

            return state
                .set("modelURL",action.url)
                .set("renderingModel",true)

        case MODEL_RENDERED:

            console.log("model rendered");

            return state
                .set("renderingModel",false);

        case QUEUE_UPDATED:

            const updatedShownQueue = getShownQueue(state.get("currentPage"), action.queue, state.get("shownPerPage"));

            console.log("queue updating");
            //So it does get to here,
            console.log("printer state at this point", state.get("printerState"));
            return state
                .set("queue",action.queue)
                .set("queueShown",updatedShownQueue);

        case PAGE_TURNED:

            const shownQueue = getShownQueue(action.page,state.get("queue"), state.get("shownPerPage"));

            return state
                .set("currentPage", action.page)
                .set("queueShown", shownQueue);

        //Literally exact same stuff like blog.

        case PRINTER_INFO_UPDATED:


            return state
                .set("printerState", action.printerInfo)
                .set("color", action.printerInfo.colors[0])
                .set("material", action.printerInfo.materials[0])

        case MODEL_UPLOADED:

            console.log("model uploaded",action.model);
            return state
                .set("uploadedModel", action.model)
                //.set("renderingModel", true)
                .set("error","");


        case FIELD_CHANGED:

            const fieldName = action.fieldName;

            if (fieldName == 'x' || fieldName == 'y' || fieldName == 'z'){
                
                
                console.log("action value", action.value);
                const newInput = action.value[action.value.length - 1];
                console.log("new input",newInput);

                if (newInput != null){
                    
                    const parsedInt = parseInt(newInput,10);

                   
                    if (isNaN(parsedInt)){
                        return state;
                    }
                    else if (action.value[0] == '0'){
                        //Otherwise replace the 0.
                        return state
                            .set(action.fieldName,parsedInt);

                    }
                }
                else if (newInput == null){
                    return state
                        .set(action.fieldName,0);
                }
            }
            return state
                .set(action.fieldName,action.value)
                .set("error","");

        case PRINT_ORDER:
            
            return state
                .set("ordering",true);

    console.log("body")
        case PRINT_ORDER_FAILED:
            
            return state
                .set("ordering",false)
                .set("error",action.error);

        case PRINT_ORDER_SUCCESS:
            
            console.log("action", action);
            //Initial state cause done with this order, or should i leave all the fields filled in? That's ux pov.
            return state
                .set("ordering",false)
                .set("receipt",action.receipt);


        //Add location_change to this later.
        //Actually can this even happen? Can cancel update profile to go back to profile
        //but cancelling print is just leaving page lol, unless, okay whatever for now.
        case PRINT_CANCELLED:
            return initialState;
        
        default:
            return state;
    }


}