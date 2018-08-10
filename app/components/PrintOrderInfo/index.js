import React, {Component} from 'react';
import styled from 'styled-components';
import {Button} from 'reactstrap';
import Popover from 'react-simple-popover';
import Modal from 'react-responsive-modal';
import UpdateOrderForm from 'containers/UpdateOrderForm/';

//Rename this in future as there will be button for both info, and updating that info.

const PrintOrderInfoWrapper = styled.li`


    width:30%;
    display:inline-block;
    border: 2px solid black;
    margin-left:2%;

`;


const PopoverContent = styled.div`

    font-size:80%;

`;
const PopoverHeader = styled.p`

    text-align:center;

`;

const PopoverBody = styled.p`

`;


class PrintOrderInfo extends Component{


    constructor(props){
        super(props);

        this.state = {
         popoverOpen :false,
         updateModalOpen: false,
        }
        this.toggle = this.toggle.bind(this);
        this.close = this.close.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    toggle(){

        this.setState({
            popoverOpen : !this.state.popoverOpen
        });
    }

    
    close(){

        this.setState({
            popoverOpen:false,
        });
    }

    openModal(){

        this.setState({
            updateModalOpen: true,
        });
    }

    closeModal(){

        this.setState({
            updateModalOpen: false,
        })
    }

    render(){

        const {name, start,end, duration} = this.props.order;
        //Redundant that has to be loggedInUser, I mean I could turn this into container so has selector
        //But has no reducers so no point.
        const {isAdmin} = this.props;

        return (<PrintOrderInfoWrapper>

            <p> {name} </p>
            <Button onClick = {this.toggle} ref={name+"_info"}> Info </Button>
            <Popover placement = "right" target = {this.refs[name+"_info"]} show = {this.state.popoverOpen} onHide = {this.close}>
                <PopoverContent>
                    <PopoverHeader> Order Status of <p><b>{name}</b></p> </PopoverHeader>
                    <hr/>

                    <PopoverBody>
                                <p>Estimated Start Time: {start} </p>
                                <p>Duration: {duration}</p>
                                <p>Estimated Finish Time: {end} </p>
                    </PopoverBody>

                </PopoverContent>
            </Popover>

            {/*This is only shown if logged in as admin though. Probably should have just admin site at some point, but this just makes sense to me.*/}
            
            <Button hidden = {!isAdmin} onClick = {this.openModal}> Update </Button>
            <Modal open = {this.state.updateModalOpen} onClose = {this.closeModal} center = {true}>

                {/*Form for updating the same information that is shown here. Okay, this is where reducer might be needed. Either that
                or forward the callbacks here, extra layer of indirecton so slower, but that works. Though making container just for form, would
                be good, then just import it here. That would make much more sense too.*/}
                {/* might need to make it a lambda that then does it*/}
                <UpdateOrderForm onUpdateSuccess={this.closeModal}/>

            </Modal>
            
            </PrintOrderInfoWrapper>);

    }


}

export default PrintOrderInfo;