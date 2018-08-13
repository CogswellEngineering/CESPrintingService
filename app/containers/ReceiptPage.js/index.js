//This container will be where the email will link them to once the estimates have been made.
//It will show all the information the queue info block would, plus the price and a button to confirm the purchase.
//It will be in queue regardless if confirmed or not.

//Okay the email sending link to this page now works.
//What this will do:
    /*Start:*/
        //Passed in query parameter, representing the the ordered item, prob just uid of it.
        //Wait, hmm tracking orders is thing isn't it, obviously can't track order that's not yours.
        //Path could be uid/orders/orderID. This way if they try to go to link, will compare the first url parameter
        //current user logged in, then if doesn't match, redirect to home or page not found.
    /*Purpose:*/
        //Shown receipt / order information.
        //if (purchase not confirmed)
        //    Give option to confirm purchase
        //else
        //    Give option to cancel purcahse.
        //    They get money back, and we keep the printed model for show. (Safe place, so not refunded, then stolen)
    /*Updates*/
        //Checking clicked
        //Checking order looking at's status, it should auto update, if updated. Prob annoying that they'll recieve email even though see it
        //,but brevity.
    /*Finish*/
        //Never really finished, just they decide to leave.
    /*Requirements*/
        //Reducer for order looking at, though could be inner state, couldnt it?
        //Saga? Yes, mainly because let's say they confirm, then this page needs to be updated if I do it on this call back
        //would need to dispatch an action here on finish, basically what saga is for. Unless keep confirmed or not local state,
        //but it's dependant on global state logged in user, do need saga cause api to call to stripe.
        //since they own it, no one else can so can be effected directly.
        
        //Do i need selector? Yeah, cause memoization on it's properties cause technically same address. Don't need structured
        //selector though.


import React, {Component} from 'react';
import { connect} from 'react-redux';
import { compose} from 'redux';
import {CardElement, injectStripe} from 'react-stripe-elements';

import { createStructuredSelector, } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeSelectLoggedIn, makeSelectFirebase} from 'containers/App/selectors';

import reducer from './reducer';
import saga from './saga';

import {

    makeSelectError,
    makeSelectOrder,
    makeSelectOrderCharged,
} from './selectors';

import {

    orderLoaded,
    confirmOrder,
} from './actions';

import { RECEIPT_PAGE_PATH} from 'components/Header/pages';


class ReceiptPage extends Component{

    constructor(props) {

        super(props);


        //Honestly, do I even need this shit? a double confirm, confirm then pay.
        //Or should I have the card stuff just always there.
        this.state = {

            paymentSectionOpen:false,
        };

        this.unsubscribe = null;
    }

    componentDidMount(){


    }


}

const mapStateToProps = createStructuredSelector({

        loggedInUser: makeSelectLoggedIn(),
        firebase: makeSelectFirebase(),
        error:makeSelectError(),
        orderInfo: makeSelectOrder(),
        charged: makeSelectOrderCharged(),
});

function mapDispatchToProps(dispatch){


    return {

        onOrderLoaded: (order) => {

            return dispatch(orderLoaded(order));
        },
        onConfirmOrder: (orderInfo, stripeToken) => {

            return dispatch(confirmOrder(orderInfo, stripeToken));
        },

    }
}


//Now, how do I inject stripe like inject reducer and saga?
//Okay after composition(injectStripe(ReceiptPage) instead of just ReceiptPage)
//These keys need to be placed in pages
const withReducer = injectReducer({key: RECEIPT_PAGE_PATH, reducer });
const withSaga = injectSaga({key: RECEIPT_PAGE_PATH, saga});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(

    withReducer,
    withSaga,
    withConnect,


)(injectStripe(ReceiptPage));
