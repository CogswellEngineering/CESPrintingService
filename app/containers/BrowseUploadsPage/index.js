import React, {Component} from 'react';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { connect } from 'react-redux';
import { compose } from 'redux';

//Will port code over later, I don't want to duplicate that code.
import { createStructuredSelector } from 'reselect';


import reducer from './reducer';

import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';

import {BROWSE_UPLOADS_PATH } from 'components/header/pages';

import {

    makeSelectFirebase,
    makeSelectLoggedIn,
}
from 'containers/App/selectors';

import {

    makeSelectUploads,
    makeSelectPageInfo,

} from './selectors';



//Uploads will be models or prints.
//You can filter uploads
//Uploads will have listener to it.
//There will be modelviewer components within each model selection prob as well as prints.
//There will be buttons on each or just is button itself.


/*Needs:

    pagination,
    selectFirebase,
    upload / share button that will open modal for logged in user to upload their own model or share their own prints

    //Is container cause will need reducer and a saga for uploading new models
*/


//This will have it's own local state
//with available filters.
class BrowseUploadsPage extends Component{


    constructor(props) {

        super(props);

        this.state = {

            filters : ["Models", "Prints"];
        }
    }

    render(){


    }


}


const mapStateToProps = createStructuredSelector({


    firebase : makeSelectFirebase(),
    uploads : makeSelectUploads(),
    pageInfo : makeSelectPageInfo(),


});

function mapStateToDispatch(dispatch){


    return {

        
    }


}



