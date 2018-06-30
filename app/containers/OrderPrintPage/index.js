import React, { Component} from 'react';
import styled from 'styled-components';
//Probably move this elsewhere later, doesn't make sense to be in components,
//it's just data.
import { ORDER_PRINT_PATH} from 'components/Header/pages';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { withFirebase } from 'react-redux-firebase';
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
    createQueueSelector,
    createSelectShownPerPage,
    createSelectCurrentPage,
    createSelectBool,
    createSelectField,
    createUploadedModelSelector,

} from './selectors';

import saga from './saga';

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

const PrintQueue = styled.div`

    

`
//Have to jsut test this later.
//Need to install react-strap and react-dropzone.


class OrderPrintPage extends Component{



    constructor(props){

        super(props);

        this.unsubscribe = null;
    }
    
    componentDidMount(){

        //Creates firestore ref for
        console.log(this.props);
        console.log("firebase ref",this.props.firebase);
        const queueRef = this.props.firebase.firestore().ref().collection("PrinterServiceInfo");

        this.unsubscribe = queueRef.doc("OrderedPrints").onSnapshot(snapshot => {


            if (snapshot.exists){
                //It should be looking at all fields
                //Hopefully data just gets everything as single object
                //Will need tab and window thing.
                const queue = snapshot.get("queue");
                console.log(snapshot.get("queue"));

                //Dispatches updated queue action.
                this.props.onQueueUpdated(queue);

            }
        })
    }

    componentWillUnmount(){

        //Stops the event listener for updating queue
        this.unsubscribe();
    }

    componentDidUpdate(){

        
        
    }

    render(){

        const {queue, queueShown, ordering, color, height, width, printReady, model, firebase,
            shownPerPage, currentPage, 
         fieldChanged, onModelUploaded, onOrderPrint} = this.props;

        return (<OrderPrintPageWrapper>

                {/*Need to install this and look at documentation for it*/}
                <PrintQueue>

                        {queueShown.map( order => {

                            console.log("order",order);
                            return null;
                        })}
                       <Pagination pageSize = {shownPerPage} current = {currentPage} total = {queue.length}
                            onChange = {(page) => {onPageTurn(page);}}
                        />
                </PrintQueue>
                {/* NO internet need to add react-strap, ust typing to have it done*/}

                <Form  onSubmit = { (evt) => {
            
                        evt.preventDefault();
                        const uid = firebase.auth().currentUser.uid;
                        const orderInfo = {

                            
                            model,
                            color,
                            dimensions: {width, height},
                        }

                        onOrderPrint(uid, orderInfo);
                        
                    }}>
                    


                    <Label for = "width"> Choose width </Label>
                    <Input name = "width" id = "width" onChange = { (evt) => {fieldChanged(evt);}} value = {width}/>

                    <Label for = "height"> Choose height </Label>
                    <Input name = "height" id = "height" onChange = { (evt) => {fieldChanged(evt);}} value = {height}/>

                    <DropZone onDrop = { (fileDropped) => {
                        
                        //This way I can also reject it if not right file.
                        onModelUploaded(fileDropped);

                    }}
                    
                    >


                    </DropZone>
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

        onOrderPrint : (uid, orderInfo) => {

            return dispatch(orderedPrint(uid, orderInfo));
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
    withFirebase
)(OrderPrintPage);
