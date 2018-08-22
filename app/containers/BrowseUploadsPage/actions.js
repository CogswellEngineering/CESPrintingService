import {

    FILTER_APPLIED,
    PAGE_TURNED,
    UPLOADS_UPDATED,
} from './constants';


function filterApplied(filter){

    return {

        type: FILTER_APPLIED,
        filter,
    };

}

function pageTurned(page){

    return{

        type: PAGE_TURNED,
        page,
    };
}

function uploadsUpdated(uploads){

    return{

        type:UPLOADS_UPDATED,
        uploads,
    };
}

export{

    filterApplied,
    pageTurned,
    uploadsUpdated,
};