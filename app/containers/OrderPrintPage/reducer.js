import { fromJS} from 'immutable';
import {

    PRINT_ORDER,
    PRINT_ORDER_FAILED,
    PRINT_ORDER_SUCCESS,
    PRINT_CANCELLED,
    QUEUE_UPDATED,
    PAGE_TURNED,
} from './constants';


const initialState = fromJS({

    /*State fields related to the model queue*/
    //I could separate the shown queue part, or keep together like did BlogPage
    queue:[],
    //What's currently shown based on page.
    queueShown:[],
    currentPage:1,
    shownPerPage:5,

    ordering:false,
    //This kind of limits it, unless people know what they're doing, neeed to make screen for that case too.
    //Or if they have simplify3D then they can just upload that x3kg to us directly then only need color
    height:0,
    width:0,
    unit:"",
    color:"",
    //Will add option to upload xk3g file or just make it so these go away if modelFile is of type xk3g, prob better like that
    //but there are other types that are print ready, okay will give button for this options.
    isPrintReadyModel:false,
    uploadedModel:null,
    reciept:null,
    error:"",

});


//For returning resulting sub array that will then be set to shown posts.
//This will be called when change page, and when total blog posts change.
function getShownQueue(page,queue,shownPerPage){


    var shownPosts = [];

    //Because posts on each page goes by posts per page
    const endingIndex = page * postsPerPage;

    var i = endingIndex - postsPerPage;

    for (; i < endingIndex && i < allPosts.length; ++i){

        shownPosts.push(allPosts[i]);
    }

    return shownPosts;


}


export default function orderPrintReducer(state = initialState, action){

    switch(action.type){


        /*Shown Queue Related actions*/

        case QUEUE_UPDATED:

            return state
                .set("queue",action.queue);

        case PAGE_TURNED:

            const pageQueue = getShownQueue(action.page,state.get("queue"), state.get("shownPerPage"));

            return state
                .set("currentPage", action.page)
                .set("shownQueue", pagePosts);

        //Literally exact same stuff like blog.

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
        
        default:
            return state;
    }


}