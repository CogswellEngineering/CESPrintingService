import { createSelector} from 'reselect';
import {BROWSE_UPLOADS_PATH } from 'components/header/pages';



const selectUploadsPage = (state) => state.get(BROWSE_UPLOADS_PATH);


function getShownPosts(page,posts,shownPerPage){


    var shownPosts = [];

    //Because posts on each page goes by posts per page
    const endingIndex = page * shownPerPage;

    var i = endingIndex - shownPerPage  ;

    for (; i < endingIndex && i < posts.length; ++i){

        shownPosts.push(posts[i]);
    }

    return shownPosts;


}


//This should only happen if uploads itself called,
//filter changed, or page turned.
//To reduce doing this without adding complexity, linking to different page for uploading might be good idea
//after all. Instead of a modal.
const makeSelectUploads = () => createSelector(

    selectUploadsPage,
    (uploadsPageState) => {


        if (uploadsPageState == null){
            
            return [];
        }

        

      

        const allUploads = uploadsPageState.get("uploads");

        //Filtering by page first so less to go through for filter.
        const shownUploads = getShownPosts(uploadsPageState.get("currentPage"), allUploads, uploadsPageState.get("postsPerPage"));

        //Filtering shownUploads by type of upload
        const appliedFilter = uploadsPageState.get("filter");

        const filteredUploads = shownUploads.filter( upload => appliedFilter.includes(upload.type));


        return filteredUploads;
    }
);


//Should I do paginator, same as order print or make my own?
const makeSelectPageInfo = () => createSelector(

    selectUploadsPage,
    (uploadsPageState) => {


        if (uploadsPageState == null){

            return null;
        }

        return {currentPage: uploadsPageState.get("currentPage"), postsPerPage: uploadsPageState.get("postsPerPage")};
    }


);

export{

    makeSelectUploads,
    makeSelectPageInfo,

};



