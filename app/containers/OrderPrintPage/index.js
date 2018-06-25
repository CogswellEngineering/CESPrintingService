import React, { Component} from 'react';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { withFirebase } from 'react-redux-firebase';
import {
    orderedPrint
} from './actions';

class OrderPrintPage extends Component{



    constructor(props){

        super(props);

        this.unsubscribe = null;
    }
    
    componentDidMount(){

        //Creates firestore ref for
        const queueRef = this.props.firebase.firestore().ref().collection("OrderedPrints");

        this.unsubscribe = queueRef.doc("queue").onSnapshot(snapshot => {


            if (snapshot.exists){
                //It should be looking at all fields
                //Hopefully data just gets everything as single object
                //Will need tab and window thing.
                console.log(snapshot.data())

            }
        })
    }


}