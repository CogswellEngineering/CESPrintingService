import React, { Component} from 'react';
import styled from 'styled-components';

import { ORDER_PRINT_PATH} from 'components/Header/pages';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { connect } from 'react-redux';
import { compose } from 'redux';

//Will port code over later, I don't want to duplicate that code.
import { createStructuredSelector } from 'reselect';
import  ModelViewer  from 'components/ModelViewer';
import { Button,} from 'components/StyledComponents/Generic';
import { Form, Label, Input, 
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem,} from 'reactstrap';
import reducer from './reducer';
//Pagination imports
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import DropZone from 'react-dropzone';


import DropdownCaretImage from '../../images/caret.png';
import xyzGridImage from '../../images/xyzGrid.png';
var fileDownload = require('js-file-download');



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


import {
    orderedPrint,
    queueUpdated,
    fieldChanged,
    modelUploaded,
    pageTurned,
    updatedPrinterInfo,
    modelRendered,
} from './actions';

import PrintOrderInfo from 'components/PrintOrderInfo/';

import {

    OrderPrintPageWrapper,
    OrderInfo,
    OrderPrintSubmit,
    PrintQueue,
    PrintQueueHeader,
    QueuePagination,
    PurchaseForm,
    MaterialSelection,
    ColorSelection,
    DimensionsImage,
    DimensionsInput,
    StyledDropdownItem,
    StyledDropdownToggle,
    DropdownCaret,
    DropZoneModel,
    UploadModelButton,
    RecentOrdersButton,
    RecentOrdersModal,
    UploadOptions,

    IFrameModelViewer,
    ErrorMessage,
} from 'components/StyledComponents/OrderPrintPage';

//Have to jsut test this later.
//Need to install react-strap and react-dropzone.


class OrderPrintPage extends Component{



    constructor(props){

        super(props);


        this.unsubscribeCalls = [];

//        this.modelViewer = React.createRef();
        //Does this really have to be that?
        this.state = {
            colorDdOpen:false,
            materialDdOpen:false,
            recentOrdersModalOpen:false,
        }

        this.toggleDd = this.toggleDd.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

        this.client = null;
    }


    
    componentDidMount(){



        //Creates firestore ref for

        const printerServiceInfoRef = this.props.firebase.firestore().collection("PrinterServiceInfo");
        const queueRef = printerServiceInfoRef.doc("OrderedPrints").collection("Queue");
        const printerStateRef = printerServiceInfoRef.doc("PrinterState");

        const options = {
            //For changes to alrady added posts.
            includeMetadataChanges: true,
        };

        //Subscription for queue, this should be triggering everytime, a change is made to queue. Including data changes
        this.unsubscribeCalls.push(queueRef.orderBy("orderTime").onSnapshot(options,(docSnapshot) => {

                    var newQueue = [];
                    const docs = docSnapshot.docs;
                    //Okay, so it only gets rid of the one updated, not the entire queue.
                    for ( const index in docSnapshot.docs){

                        const doc = docs[index];
                        
                        if (doc.exists){
                            const docData = doc.data();
                            docData.orderId = doc.id;
                            newQueue.push(docData);
                        }
                    }

                    this.props.onQueueUpdated(newQueue);                
            }
        ));


        //Subscription for colors and materials available.
        this.unsubscribeCalls.push(printerStateRef.onSnapshot(options, doc => {

            this.props.onUpdatePrinterInfo(doc.data());
            
        }))
    }

    componentWillUnmount(){

        //Stops the event listener for

        for (const i in this.unsubscribeCalls){

              this.unsubscribeCalls[i]();
        }
    }

    openModal(){

        this.setState({
            recentOrdersModalOpen: true,
        });
    }

    closeModal(){
        
        this.setState({
            recentOrdersModalOpen:false,
        });
    }

    toggleDd(event){

        const target = event.target;

        this.setState({

            [target.id+"Open"] : !this.state[target.id+"Open"]

        });


    }

  
    render(){



        const {loggedInUser, queue, queueShown, ordering, material, color, y, x, z, printReady, model, firebase, error, receipt,
            printerState,
            shownPerPage, currentPage, renderingModel,
            onFieldChanged, onModelUploaded, onOrderPrint, onPageTurn} = this.props;

            //Okay so what might be happening is that the subscription dispatch, is somehow calling it to when the state was initial
            //aka when it first happened. In other words,
            //so, why is printerState null after this???

        if (printerState == null || printerState.materials == null || printerState.colors == null){
            //Okay, here. 
            return null;
        }

       


        const printQueue = (<PrintQueue>
                
                <PrintQueueHeader> Printer Queue </PrintQueueHeader>

                { queueShown.length != 0? queueShown.map( order => {

                    return <PrintOrderInfo id={order.orderId+"_info"} key={order.orderId} order = {order} isAdmin={loggedInUser.isAdmin}/> 
                })
                : <p> Queue is Empty </p>
                }
          
            </PrintQueue>);
    
    console.log("receipt",receipt);
        if (receipt != null){
            return (
                <OrderPrintPageWrapper>
                
                {printQueue}
                <QueuePagination pageSize = {shownPerPage} current = {currentPage} total = {queue.length} locale	= {{prev_page: 'prev', next_page: 'next'}}
                onChange = {(page) => {onPageTurn(page);}} />
                <p> Your order #{receipt.orderId} to 3DPrint the has been placed in the queue. Please check your email for information on managing your order.</p>
                <Button> Click here to order another print </Button>
                </OrderPrintPageWrapper>
                
            );

        }
        console.log("model obj", model);
        
       //NOW WTF IS HAPPENING. IT DISAPPEARS EVERY TIME.
        return (<OrderPrintPageWrapper>



                {/*Need to install this and look at documentation for it*/}
                
                {/* NO internet need to add react-strap, ust typing to have it done*/}

                {printQueue}

                <QueuePagination pageSize = {shownPerPage} current = {currentPage} total = {queue.length} locale	= {{prev_page: 'prev', next_page: 'next'}}
                onChange = {(page) => {onPageTurn(page);}} />

                <DropZoneModel disableClick modeluploaded={(model != null).toString()} onDrop = { (fileDropped) => {
                        
                      
                        onModelUploaded(fileDropped[0]);

                    }}>



                    {model?
                    //I mean I know I said would revise this to work better, but now not even woring peroiod? What the fuck.
                            <div>

                                                        
                                <UploadModelButton onClick = {() => {onModelUploaded(null);}}>UPLOAD DIFFERENT MODEL</UploadModelButton>
                            {/*I could just make it a button that adds null to model uploaded, since essentially what I'm doing.*/}
                            <UploadModelButton > UPLOAD DIFFERENT MODEL(file choose)

                                <input type="file" id="uploadDifferentModel" type="file"
                                    onChange = {(evt,file) => {
                                        
                                        console.log("this is triggered when cancel, but only sometimes");
                                        console.log("evt", evt);

                                        onModelUploaded(evt.target.files[0]);
                                    }}  

                                style={{display:"none"}}
                            /> 
                            </UploadModelButton>    



                            
                            {renderingModel?
                                //I had this error before. 

                                <ModelViewer modelPath = {this.props.modelURL}/>


                            :
                                null
                            }
                            
                            </div>
                        :
                     <UploadOptions>

                            {/*This needs to change, this upload button ugly as shit.*/}
                            
                                {/*Honestly could just use dropzone and do that, but benefit of this is hey can click button to browse for models*/}
                                {/*also button for brevity. Also*/}
                                <UploadModelButton> CLICK HERE TO UPLOAD MODEL 
                                <input type="file" id="uploadModel" type="file" label="CLICK TO UPLOAD MODEL" 
                                    onChange = {(evt,file) => {

                                        console.log("file", evt.target.files);

                                        onModelUploaded(evt.target.files[0]);
                                    }}  

                                style={{display:"none"}}
                            /> 
                            </UploadModelButton>

                            <RecentOrdersButton onClick = {this.openModal}> BROWSE YOUR MODELS </RecentOrdersButton>
                            <RecentOrdersModal open={this.state.recentOrdersModalOpen} onClose={this.closeModal} center={true}>


                                  {/*Here will be separate container that pulls from database of uploaded models of the user or previous orders*/}

                            </RecentOrdersModal>
                            
                            <p style = {{color:"green", fontSize:"15px"}}> Or drag and drop your model into this area </p>
                            
                            

                    </UploadOptions>

                    }

                     
                </DropZoneModel>
                <PurchaseForm  onSubmit = { (evt) => {
            
                        evt.preventDefault();

                        //Do this on pop queue button pressed.
                        //fileDownload(model,"model.obj");
                        const uid = firebase.auth().currentUser.uid;

                        var formData = new FormData();

                        formData.append("model",model);
                        formData.append("color",color);
                        formData.append("dimensions", JSON.stringify({x,y}));
                        formData.append("orderer", uid);               

                        onOrderPrint( formData);
                        
                    }}>

                     
                    

                    <MaterialSelection>
                        <Label for = "material"> Materials </Label>
                        <Dropdown id="material"  isOpen = {this.state.materialDdOpen} toggle={this.toggleDd} direction="down">

                            <StyledDropdownToggle id = "materialDd" >
                                
                                {material} <DropdownCaret src={DropdownCaretImage} id="materialDd" onClick={this.toggleDd}/>

                            </StyledDropdownToggle>

                            <DropdownMenu >

                                {printerState.materials.map( material => {
                                    return <StyledDropdownItem key = {material}  id = "materialDd" name="material" value={material} onClick = {(evt) => {onFieldChanged(evt);}}> {material} </StyledDropdownItem>
                                })}

                            </DropdownMenu>

                        </Dropdown>

                    </MaterialSelection>
                    
                    <ColorSelection>
                        <Label for = "color"> Colors </Label>
                        <Dropdown id="color"  isOpen = {this.state.colorDdOpen} toggle={this.toggleDd} direction="down">

                            <StyledDropdownToggle id = "colorDd" >
                                
                                {color} <DropdownCaret src={DropdownCaretImage} id="colorDd" onClick={this.toggleDd}/>

                            </StyledDropdownToggle>

                            <DropdownMenu >


                                {printerState.colors.map( color => {
                                    return <StyledDropdownItem key = {color}  id = "colorDd" name="color" value={color} onClick = {(evt) => {onFieldChanged(evt);}}> {color} </StyledDropdownItem>
                                })}

                            </DropdownMenu>

                        </Dropdown>

                    </ColorSelection>


                    {/*<Label for = "x"> Choose x </Label>*/}
                    
                    <DimensionsImage src={xyzGridImage}/>


                    <DimensionsInput name = "x" id = "x" style={{marginLeft: "0%"}}
                     onChange = { (evt) => {onFieldChanged(evt);}} value = {x}/>
                     
                    {/* <Label for = "y"> Choose y </Label>*/}
                    <DimensionsInput name = "y" id = "y" onChange = { (evt) => {onFieldChanged(evt);}} value = {y}/>
                     
                    <DimensionsInput name = "z" id = "z" onChange = { (evt) => {onFieldChanged(evt);}} value = {z}/>

                    <OrderPrintSubmit type="submit" value="Order"/>
                    <ErrorMessage> {error} </ErrorMessage>

                </PurchaseForm>
            
            
            
            </OrderPrintPageWrapper>)
    }


}

const  mapStateToProps = createStructuredSelector({

    loggedInUser: makeSelectLoggedIn(),
    printerState : createSelectPrinterInfo(),
    receipt : createSelectField("receipt"),
    queue : createQueueSelector(""),
    queueShown : createQueueSelector("Shown"),
    error: createSelectField("error"),
    currentPage : createSelectCurrentPage(),
    shownPerPage : createSelectShownPerPage(),
    ordering:  createSelectBool("ordering"),
    renderingModel : createSelectBool('renderingModel'),
    material: createSelectField("material"),
    color : createSelectField("color"),
    y : createSelectField("y"),
    x : createSelectField("x"),
    z: createSelectField("z"),
    printReady : createSelectBool("printReadyModel"),
    model : createUploadedModelSelector(),
    modelURL: createSelectField("modelURL"),
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
       
            return dispatch(fieldChanged(target.name, target.value));
        },

        onModelRendered : () =>{

            return dispatch(modelRendered());
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
