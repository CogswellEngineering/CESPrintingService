import { fromJS} from 'immutable';

import {

    FILTER_APPLIED,
    PAGE_TURNED,
    UPLOADS_UPDATED,
} from './constants';



const initialState = fromJS({

    //Filter will be array of objects, with name and set.
    filter:[],
    uploads:[],
    page:[],
    //Selector should handle page selection, not reducer.
    currentPage:1,
    postsPerPage:20,

});


export default function reducer(state = initialState, action){


    switch (action.type){


    }

}