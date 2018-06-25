import {

    PRINT_ORDER,
    PRINT_ORDER_FAILED,
    PRINT_ORDER_SUCCESS,
    PRINT_CANCELLED,
} from './constants';
const initialState = fromJS({

    ordering:false,
    //This kind of limits it, unless people know what they're doing, neeed to make screen for that case too.
    //Or if they have simplify3D then they can just upload that x3kg to us directly then only need color
    height:0,
    unit:"",
    color:"",
    //Will add option to upload xk3g file or just make it so these go away if modelFile is of type xk3g, prob better like that
    //but there are other types that are print ready, okay will give button for this options.
    isPrintReadyModel:false,
    modelFile:"",
    reciept:null,
    error:"",

});

function orderPrintReducer(state = initialState, action){

    switch(action.type){

        case PRINT_ORDER:
            
            return state
                .set("ordering",true);

        case PRINT_ORDER_FAILED:
            
            return state
                .set("ordering",false)
                .set("error",action.error);

        case PRINT_ORDER_SUCCESS:
            
            //Initial state cause done with this order, or should i leave all the fields filled in? That's ux pov.
            return initialState
                .set("ordering",false)
                .set("reciept",action.reciept);


        //Add location_change to this later.
        //Actually can this even happen? Can cancel update profile to go back to profile
        //but cancelling print is just leaving page lol, unless, okay whatever for now.
        case PRINT_CANCELLED:
            return initialState;
        
    }


}