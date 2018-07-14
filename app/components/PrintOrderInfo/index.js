import React, {Component} from 'react';
import styled from 'styled-components';
import {Button} from 'reactstrap';
import Popover from 'react-simple-popover';

const PrintOrderInfoWrapper = styled.li`


    width:30%;
    display:inline-block;
    border: 2px solid black;
    margin-left:1%;

`;


const PopoverContent = styled.div`

    padding-right:50px;

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
         popoverOpen :false   
        }
        this.toggle = this.toggle.bind(this);
        this.close = this.close.bind(this);
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

    render(){

        const {name, start,end, duration} = this.props.order;


        return (<PrintOrderInfoWrapper>

            <p> {name} </p>
            <Button onClick = {this.toggle} ref={name+"_info"}> Info </Button>
            <Popover placement = "bottom" target = {this.refs[name+"_info"]} show = {this.state.popoverOpen} onHide = {this.close}>
                <PopoverContent>
                    <PopoverHeader> Order Status </PopoverHeader>
                    <hr/>

                    <PopoverBody>
                                <p>EST: {start} </p>
                                <p>Duration: {duration}</p>
                                <p>EET: {end} </p>
                    </PopoverBody>

                </PopoverContent>
            </Popover>
            
            
            </PrintOrderInfoWrapper>);

    }


}

export default PrintOrderInfo;