import React, { Component} from 'react';
import styled from 'styled-components';
//Probably move this elsewhere later, doesn't make sense to be in components,
//it's just data.
import { ORDER_PRINT_PATH} from 'components/Header/pages';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { connect } from 'react-redux';
import { compose } from 'redux';

//Will port code over later, I don't want to duplicate that code.
import { createStructuredSelector } from 'reselect';
import { Form, Label, Input} from 'reactstrap';
import reducer from './reducer';
//Pagination imports
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import DropZone from 'react-dropzone';

import {
    makeSelectFirebase,
    makeSelectLoggedIn,
}
from 'containers/App/selectors';

import {
    createQueueSelector,
    createSelectShownPerPage,
    createSelectCurrentPage,
    createSelectBool,
    createSelectField,
    createUploadedModelSelector,

} from './selectors';

import saga from './saga';

var fileDownload = require('js-file-download');

import {
    orderedPrint,
    queueUpdated,
    fieldChanged,
    modelUploaded,
    pageTurned,
} from './actions';




const OrderPrintPageWrapper = styled.div`


    width:50%;
    margin:auto;


`

const OrderInfo = styled.span`

    width:10%;
    margin-left:1%;

`

const PrintQueue = styled.div`

    margin-top :10%;
    

`
//Have to jsut test this later.
//Need to install react-strap and react-dropzone.


class OrderPrintPage extends Component{



    constructor(props){

        super(props);

        this.unsubscribe = null;
        console.log("hello");

    }
    
    componentDidMount(){


        //Creates firestore ref for
        console.log(this.props);
        console.log("firebase ref",this.props.firebase);
        const queueRef = this.props.firebase.firestore().collection("PrinterServiceInfo").doc("Orders").collection("Queue");

        const options = {
            //For changes to alrady added posts.
            includeMetadataChanges: true,
        };

        this.unsubscribe = queueRef.onSnapshot(options,(docSnapshot) => {

                    var newQueue = [];
                    const docs = docSnapshot.docs;
                    console.log("docs",docs);
                    for ( const index in docSnapshot.docs){

                        const doc = docs[index];

                        if (doc.exists){
                            newQueue.push(doc.data());
                        }
                    }
                    console.log("new queue",newQueue);

                    this.props.onQueueUpdated(newQueue);                
            }
        );
    }

    componentWillUnmount(){

        //Stops the event listener for updating queue
        this.unsubscribe();
    }

    render(){


        const {queue, queueShown, ordering, color, height, width, printReady, model, firebase,
            shownPerPage, currentPage, 
            onFieldChanged, onModelUploaded, onOrderPrint} = this.props;

        return (<OrderPrintPageWrapper>

                {/*Need to install this and look at documentation for it*/}
                <PrintQueue>

                        {queueShown.map( order => {

                            return <OrderInfo key={order.name}> {order.name} </OrderInfo>
                        })}
                       <Pagination pageSize = {shownPerPage} current = {currentPage} total = {queue.length}
                            onChange = {(page) => {onPageTurn(page);}}
                        />
                </PrintQueue>
                {/* NO internet need to add react-strap, ust typing to have it done*/}

                <Form  onSubmit = { (evt) => {
            
                        evt.preventDefault();

                        //Do this on pop queue button pressed.
                        //fileDownload(model,"model.obj");
                        const uid = firebase.auth().currentUser.uid;

                        var formData = new FormData();

                        formData.append("model",model);
                        formData.append("color","red");
                        formData.append("dimensions", {width,height});
                        formData.append("orderer", uid);

                      

                        onOrderPrint( formData);
                        
                    }}>
                    


                    <Label for = "width"> Choose width </Label>
                    <Input name = "width" id = "width" onChange = { (evt) => {onFieldChanged(evt);}} value = {width}/>

                    <Label for = "height"> Choose height </Label>
                    <Input name = "height" id = "height" onChange = { (evt) => {onFieldChanged(evt);}} value = {height}/>

                    <DropZone onDrop = { (fileDropped) => {
                        
                        //This way I can also reject it if not right file.
                        console.log("file dropped",fileDropped[0]);
                        onModelUploaded(fileDropped[0]);

                    }}
                    
                    >

                    <p> {model? model.name : ""} </p>

                    </DropZone>
                    <Input type="submit" value="submit"/>

                </Form>
            
            
            
            </OrderPrintPageWrapper>)
    }


}

const  mapStateToProps = createStructuredSelector({

    queue : createQueueSelector(""),
    queueShown : createQueueSelector("Shown"),
    currentPage : createSelectCurrentPage(),
    shownPerPage : createSelectShownPerPage(),
    ordering:  createSelectBool("ordering"),
    color : createSelectField("color"),
    height : createSelectField("height"),
    weight : createSelectField("weight"),
    printReady : createSelectBool("printReadyModel"),
    model : createUploadedModelSelector(),
    firebase: makeSelectFirebase(),


})


function mapDispatchToProps(dispatch){

    return {

        onPageTurn : (page) => {

            return dispatch(pageTurned(page));
        },

        onQueueUpdated : (queue) => {

            return dispatch(queueUpdated(queue));
        },

        onModelUploaded : (model) => {

            return dispatch(modelUploaded(model));
        },

        onOrderPrint : (orderInfo) => {

            return dispatch(orderedPrint(orderInfo));
        },
         
        onFieldChanged : (evt) => {

            const target = evt.target;
            return dispatch(fieldChanged(target.name, target.value));
        },

    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({key: ORDER_PRINT_PATH,reducer});
const withSaga = injectSaga({key: ORDER_PRINT_PATH, saga});

export default compose(
    withConnect,
    withReducer,
    withSaga,
)(OrderPrintPage);
