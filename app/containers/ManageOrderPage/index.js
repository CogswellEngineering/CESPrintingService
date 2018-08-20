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
import {CardElement, injectStripe, CardNumberElement, CardCVCElement, CardExpiryElement,} from 'react-stripe-elements';

import { createStructuredSelector, } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeSelectLoggedIn, makeSelectFirebase} from 'containers/App/selectors';
import reducer from './reducer';
import saga from './saga';

import {

    makeSelectError,
    makeSelectOrder,
    makeSelectReceipt,
} from './selectors';

import {

    orderLoaded,
    confirmOrder,
} from './actions';

import {
    ManageOrderWrapper,
    SummaryHeader,
    ReviewOrder,
    OrderField,
    PaymentInformation,
    PaymentLabel,
    PaymentField,
    StyledCardElement,
    CardInfoHeader,
    StyledCardNumber,
    StyledCVCNumber,
    StyledExpiry,
    StyledPostal,
    SubmitButton,
    CancelButton,
} from 'components/StyledComponents/ManageOrderPage';

import {  MANAGE_ORDER_PATH,} from 'components/Header/pages';



//Really need to actually change this name, ManageOrderPage?
class ManageOrderPage extends Component{

    constructor(props) {

        super(props);
        console.log("Here?");   


        //Honestly, do I even need this shit? a double confirm, confirm then pay.
        //Or should I have the card stuff just always there.
        this.state = {

            paymentSectionOpen:false,
            cardName:"",
        };

        this.unsubscribe = null;
        this.confirmClicked = this.confirmClicked.bind(this);
    }

    componentDidMount(){


        //First need to check the url parameters
        console.log("props", this.props);
        const orderId = this.props.orderId;

        //orders are unique, don't need to match both orderId and user.
        //I should start splitting the storage at some point, but for now this is fine. Just, alot lol.
        const orderRef = this.props.firebase.firestore().collection("PrinterServiceInfo").doc("OrderedPrints").collection("Queue").doc(orderId);
        
        
        this.unsubscribe = orderRef.onSnapshot( doc => {

            if (doc.exists){

                console.log("Am I happening?");
                const orderData = doc.data();

                console.log("order info", orderData);

                //Dispatches onOrderLoaded.
                this.props.onOrderLoaded(orderData);
            }
        })



    }

    componentWillMount(){

        if (this.unsubscribe){
            this.unsubscribe();
        }
       
    }

    componentDidUpdate(){


        //If already charged, then go to that page.
        //Better then returning different render, I shouldn't care about state of this anymore at that point.
        //I've gotten mindset to do that, I mean sometimes it makes sense, but this case it makes more to go to new page.
        if (this.props.receipt){

            console.log("what bout me");
            //There you go, this is why I need rest of it still. I need the history.
            this.props.history.push({
                
                pathname:this.history.location.pathname+"/receipt",
                state: {receipt:this.props.receipt},
            });
        }
    }


    updateField(evt){

        const target = evt.target;

        this.setState({
            [target.name] : target.value,
        })

    }

    //This will generate the token, then dispatch order action.
    async confirmClicked(ev){

        ev.preventDefault();

        let {token} = await this.props.stripe.createToken({name: this.props.loggedInUser.displayName});
        console.log("token generated", token);
        this.props.onConfirmOrder(this.props.orderInfo,token);
        
    }

    render(){

        console.log("rops",this.props);
        const {error, orderInfo,
            onConfirmOrder} = this.props;

        if (orderInfo == null) {
            console.log("here");
            return null;
        }

        console.log("orderInfo in render", orderInfo);
        //Actually this could just be order info, but more details like color and all that.
        //Should I show the model?
        const orderInfoComponent = (<ReviewOrder>
            
            {/* not just name, but model viewer here too*/}
            <OrderField> {"Printing: " +  orderInfo.name} </OrderField>
            {/*Instead of just the string will use string as key to json here that will get the actual img.*/}
            <OrderField> {"in " + orderInfo.color} </OrderField>
            <OrderField> {'Cost: $' + orderInfo.cost} </OrderField>


            
            </ReviewOrder>);

        //Delivery? Cmon, just have them pick up at 140, wtf.
        //payment information though though should be renamed, already have order info... I'll think of better name later
        //will have them specify pick up person too
        const paymentInformation = (<PaymentInformation>
                
                <div>
                    <PaymentLabel for = "cardName"> Full Name on Card </PaymentLabel>
                    <PaymentField id = "cardName" name = "cardName" required/>
                </div>

                <div>
                    <PaymentLabel for = "collector"> Name of Collector(<i>If not yourself</i>) </PaymentLabel>
                    <PaymentField id = "collector" name = "collector"/>
                </div>


                {/*The spacing was a bit better and it was already dynamic with original. And I mean it did do sliding thing. Hmm.*/}
                <CardInfoHeader> Card Informaton </CardInfoHeader>
               
               <StyledCardElement> 
                <StyledCardNumber/>
                <StyledCVCNumber/>
                <StyledExpiry/>
                <StyledPostal/>
                </StyledCardElement>
            
            
            </PaymentInformation>);

        return (<ManageOrderWrapper>
            
                <SummaryHeader> Order Summary </SummaryHeader>


                {orderInfoComponent}
                
                {paymentInformation}


                <SubmitButton onClick = {this.confirmClicked}> Confirm Order </SubmitButton>
                <CancelButton> Cancel Order </CancelButton>
                
            
            </ManageOrderWrapper>)



    }


}

const mapStateToProps = createStructuredSelector({

        loggedInUser: makeSelectLoggedIn(),
        firebase: makeSelectFirebase(),
        error:makeSelectError(),
        orderInfo: makeSelectOrder(),
        receipt: makeSelectReceipt(),
});

function mapDispatchToProps(dispatch){


    return {

        onOrderLoaded: (order) => {

            return dispatch(orderLoaded(order));
        },
        onConfirmOrder: (orderInfo, stripeToken) => {

            return dispatch(confirmOrder(orderInfo,stripeToken));
        },

    }
}


//Now, how do I inject stripe like inject reducer and saga?
//Okay after composition(injectStripe(ReceiptPage) instead of just ReceiptPage)
//These keys need to be placed in pages
const withReducer = injectReducer({key: MANAGE_ORDER_PATH, reducer });
const withSaga = injectSaga({key: MANAGE_ORDER_PATH, saga});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

const composition = compose(

    withReducer,
    withSaga,
    withConnect,


)(ManageOrderPage);

export default(injectStripe(composition));
