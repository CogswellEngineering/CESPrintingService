import React, { Component} from 'react';
import styled from 'styled-components';

import { ORDER_PRINT_PATH} from 'components/Header/pages';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { connect } from 'react-redux';
import { compose } from 'redux';

//Will port code over later, I don't want to duplicate that code.
import { createStructuredSelector } from 'reselect';
import { Form, Label, Input, 
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem,} from 'reactstrap';
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
    createSelectPrinterInfo,

} from './selectors';

import saga from './saga';

var fileDownload = require('js-file-download');

import {
    orderedPrint,
    queueUpdated,
    fieldChanged,
    modelUploaded,
    pageTurned,
    updatedPrinterInfo,
} from './actions';

import PrintOrderInfo from 'components/PrintOrderInfo/';


const OrderPrintPageWrapper = styled.div`


    width:50%;
    margin:auto;


`

const OrderInfo = styled.span`

    width:10%;
    margin-left:1%;

`

const PrintQueue = styled.ul`

    margin-top :10%;
    border:2px solid black;
    

`
//Have to jsut test this later.
//Need to install react-strap and react-dropzone.


class OrderPrintPage extends Component{



    constructor(props){

        super(props);

        console.log(props);

        this.unsubscribeCalls = [];
        console.log("hello");

        //Does this really have to be that?
        this.state = {
            colorDdOpen:false,
        }

        this.toggleDd = this.toggleDd.bind(this);

    }
    
    componentDidMount(){


        //Creates firestore ref for
        console.log(this.props);
        console.log("firebase ref",this.props.firebase);

        const printerServiceInfoRef = this.props.firebase.firestore().collection("PrinterServiceInfo");
        const queueRef = printerServiceInfoRef.doc("OrderedPrints").collection("Queue");
        const printerStateRef = printerServiceInfoRef.doc("PrinterState");

        const options = {
            //For changes to alrady added posts.
            includeMetadataChanges: true,
        };

        //Subscription for queue.
        this.unsubscribeCalls.push(queueRef.onSnapshot(options,(docSnapshot) => {

                    var newQueue = [];
                    const docs = docSnapshot.docs;
                   
                    for ( const index in docSnapshot.docs){

                        const doc = docs[index];

                        if (doc.exists){
                            newQueue.push(doc.data());
                        }
                    }
                    console.log("new queue",newQueue);

                    this.props.onQueueUpdated(newQueue);                
            }
        ));


        //Subscription for colors available.
        this.unsubscribeCalls.push(printerStateRef.onSnapshot(doc => {

            console.log("doc data",doc.data());
            this.props.onUpdatePrinterInfo(doc.data());
            
        }))
    }

    componentWillUnmount(){

        //Stops the event listener for
        for (const i in this.unsubscribeCalls){

              this.unsubscribeCalls[i]();
        }
    }


    toggleDd(event){

        const target = event.target;

        console.log("target",target);
        this.setState({

            colorDdOpen : !this.state.colorDdOpen,

        });


    }

    render(){


        const {queue, queueShown, ordering, color, height, width, printReady, model, firebase,
            printerState,
            shownPerPage, currentPage, 
            onFieldChanged, onModelUploaded, onOrderPrint, onPageTurn} = this.props;


        if (printerState == null){
            return null;
        }

        console.log("printer state", printerState);
        return (<OrderPrintPageWrapper>

                {/*Need to install this and look at documentation for it*/}
                <PrintQueue>
                        <h1> Printer Queue </h1>

                        { queueShown.length != 0? queueShown.map( order => {

                            return <PrintOrderInfo id={order.name+"_info"} key={order.name} order = {order}/> 
                        })
                        : <p> Queue is Empty </p>
                        }
                      
                </PrintQueue>
                {/*Works... but umm lol last page and next is diff language*/}
                <Pagination pageSize = {shownPerPage} current = {currentPage} total = {queue.length} locale	= {{prev_page: 'prev', next_page: 'next'}}
                            onChange = {(page) => {onPageTurn(page);}}
                        />
                {/* NO internet need to add react-strap, ust typing to have it done*/}

                <Form  onSubmit = { (evt) => {
            
                        evt.preventDefault();

                        //Do this on pop queue button pressed.
                        //fileDownload(model,"model.obj");
                        const uid = firebase.auth().currentUser.uid;

                        var formData = new FormData();

                        formData.append("model",model);
                        formData.append("color",color);
                        formData.append("dimensions", {width,height});
                        formData.append("orderer", uid);                      

                        onOrderPrint( formData);
                        
                    }}>
                    


                    <Label for = "width"> Choose width </Label>
                    <Input name = "width" id = "width" onChange = { (evt) => {onFieldChanged(evt);}} value = {width}/>

                    <Label for = "height"> Choose height </Label>
                    <Input name = "height" id = "height" onChange = { (evt) => {onFieldChanged(evt);}} value = {height}/>

                    {/*Do these REALLY have to be in redux state too? I mean i know one source of truth but shit*/}
                    <Dropdown name = "colorDd" isOpen = {this.state.colorDdOpen} toggle={this.toggleDd}>

                        <DropdownToggle caret>
                            
                            {color}

                        </DropdownToggle>

                        <DropdownMenu >

                            {printerState.colors.map( color => {
                                return <DropdownItem key = {color} name="color" value={color} onClick = {(evt) => {onFieldChanged(evt);}}> {color} </DropdownItem>
                            })}

                        </DropdownMenu>


                    </Dropdown>

                    <DropZone onDrop = { (fileDropped) => {
                        
                        //This way I can also reject it if not right file.
                        console.log("file dropped",fileDropped[0]);
                        onModelUploaded(fileDropped[0]);

                    }}
                    
                    >

                    <p> {model? model.name : "Upload your model here"} </p>

                    </DropZone>
                    <Input type="submit" value="submit"/>

                </Form>
            
            
            
            </OrderPrintPageWrapper>)
    }


}

const  mapStateToProps = createStructuredSelector({

    printerState : createSelectPrinterInfo(),
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

        onUpdatePrinterInfo : (update) => {

            return dispatch(updatedPrinterInfo(update));

        },
         
        onFieldChanged : (evt) => {

            const target = evt.target;
            console.log("target name", target.name);
            console.log("target value", target.value);
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
