import React, {Component} from 'react';
import { connect} from 'react-redux';
import styled from 'styled-components';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import saga from './saga';
import reducer from './reducer';
import {updateOrder } from './actions'
import { Input, Button} from 'components/StyledComponents/Generic';

//This doesn't need reducer, but does need saga. I could keep all the fields local, instead of into global state
//I should avoid doing that and actually only put it in reducer state when needed. Do need reducer for error
//if updating the info in database failed.

const UpdateOrderFormWrapper = styled.div`


`;

//There's alot of redundant styling will add, so should inherit.
//Only stuff here is margining, etc.
const Field = styled(Input)`

    margin:auto;

`;

const SubmitInput = styled.input`

    color:white;
    border: 1px solid black;
    background-color:white;
    &:hover{

        background-color:gray;
    }
`;

const Label = styled.label`

    display:block;
`;


class UpdateOrderForm extends Component{



    constructor(props){

        super(props);

        //Will not be fill with current values, will change that depending on UX.
        //The input fields for this should be same style as rest of this service, doesn't have to be same as home site.
        //but similar aesthetic.
        this.state={

            //Public info
            estimatedStartTime:"",
            estimatedEndTime:"",
            duration:"",
            //Private(Maybe public?)
            cost:"",
        };

        this.onUpdateField = this.onUpdateField.bind(this);
    }

    componentDidUpdate(){


        if (this.props.updated){

            //Should be here cause after updated, then it will update again, closing the modal this is in.
            this.props.onUpdateSuccess();
        }

    }

    onUpdateField(evt){

        const target = evt.target;

        this.setState({

            [target.id] : target.value,
        });

    }

    render(){

        //It will also have prop from PrintOrderInfo, to call back to close it once update complete, which onUpdateSuccess
        const {error, updated, onUpdate, onUpdateSuccess} = this.props;


        

        return ( <UpdateOrderFormWrapper>

            <form onSubmit = {(evt) => { 
                evt.preventDefault(); 

                var formData = new FormData();
                //It's basically the whole state object, was hoping could save some lines of code.
                formData.append("cost", this.state.cost);
                formData.append("estimatedStartTime", this.state.estimatedStartTime);
                formData.append("estimatedEndTime", this.state.estimatedEndTime);
                formData.append("duration", this.state.duration);

                onUpdate(formData);
            
            }}>

            <Label for ="cost"> Cost 
            <Field id="cost" value={this.state.cost} onChange={this.onUpdateField} />
            </Label>

            <Label for ="estimatedStartTime"> Start Time 
            <Field id="estimatedStartTime" value={this.state.estimatedStartTime} onChange={this.onUpdateField} />
            </Label>

            <Label for ="estimatedEndTime"> End Time
            <Field id="estimatedEndTime" value={this.state.estimatedEndTime} onChange={this.onUpdateField} />
            </Label>


            <Label for ="duration"> Duration 
            <Field id="duration" value={this.state.duration} onChange={this.onUpdateField} />
            </Label>

            {/*Feel like cancel is redundant to X, but that's usually the case*/}
            <Button onClick = { () => {onUpdateSuccess()}}> Cancel </Button>
            <SubmitInput type="submit" value="Update" />
            

            </form>

        </UpdateOrderFormWrapper>);

    }

}

//I don't think I need selector for this.
function mapStateToProps(state){

    //Should just be local state.

    return {
        error: state.get("error"),
        updated: state.get("updated"),
    };
}

function mapDispatchToProps(dispatch){


    return {

        onUpdate: (formData) => {

            return dispatch(updateOrder(formData));
        },
    }
}


const withSaga = injectSaga({key:"UpdateOrder", saga});
const withConnect = connect(mapStateToProps,mapDispatchToProps);
const withReducer = injectReducer({key: "UpdateOrder", reducer});

export default compose(

    withReducer,
    withSaga,
    withConnect,
)(UpdateOrderForm);

