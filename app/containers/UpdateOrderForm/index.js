import React, {Component} from 'react';
import { connect} from 'react-redux';
import { compose} from 'redux';
import styled from 'styled-components';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import saga from './saga';
import reducer from './reducer';
import { updateOrder, leaveForm, } from './actions'
import { FormGroup} from 'reactstrap';
import { Input, Button} from 'components/StyledComponents/Generic';

//This doesn't need reducer, but does need saga. I could keep all the fields local, instead of into global state
//I should avoid doing that and actually only put it in reducer state when needed. Do need reducer for error
//if updating the info in database failed.

const UpdateOrderFormWrapper = styled.div`


    margin-top:10px;
`;

const FieldSection = styled.section`

`;

//There's alot of redundant styling will add, so should inherit.
//Only stuff here is margining, etc.
const Field = styled(Input)`

    margin:auto;
    float:right;
    clear:both;
    margin-left:5px;

`;

const Label = styled.label`
    text-align:right;
    
`;

const SubmitInput = styled.input`

    border: 1px solid black;
    background-color:white;
    &:hover{

        background-color:gray;
    }
`;



const CancelButton = styled(Button)`


    margin-left:5%;
`;



const ButtonGroup = styled.div`

    text-align:center;
`;


class UpdateOrderForm extends Component{



    constructor(props){

        super(props);

        //Will not be fill with current values, will change that depending on UX.
        //The input fields for this should be same style as rest of this service, doesn't have to be same as home site.
        //but similar aesthetic.
        this.state={

            //Public info, I'm honestly not sure what it should be
            //String is easy, but format of these should be a date and time.
            //Duration should also be a time.
            start:"",
            end:"",
            duration:"",
            //Private(Maybe public?)
            cost:"",
            //Honestly could just have button called pop they can press that will do it. But doing it this way makes it so queue not
            //strict structure or if have multiple 3D printers (Prob not happening). Then can mark any of them as finished. This feature
            //als makes it so that people who know how to work it already can still print on their own during downtime, like in off hours, then
            //they come in and do it. Then they will just mark it as finished, If i do it based on estimate by loading into printer
            //Then it's awkward, but if I do it based on simplify3D estimates, then they'll get their estimates, but it may be off by a bit.
            //Granted, smaller / simpler prints this won't be much of an issue.
            //Now, as for this feature, I mean for scalability and it makes sense to mark it being finished apart of update form.
            //If could mark finished other ones, then I do need to change back-end so that it also takes in the exact item,
            //That won't be O(1), I could also have both mark as finished and pop, there you go. Have both.
            markedFinished:false,
        };

        this.onUpdateField = this.onUpdateField.bind(this);
    }

    componentDidMount(){

        const order = this.props.order;

        //Not really needed anymore, but it's fine.
        this.setState({
            start: order.start,
            end: order.end,
            duration: order.duration,
            cost: order.cost,
        })

    }

    componentDidUpdate(){


        if (this.props.updated){

            //Should be here cause after updated, then it will update again, closing the modal this is in.
            this.props.leaveForm();
            this.props.close();
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
        const { order, error, updated, onUpdate, close, leaveForm} = this.props;

        //Also will have a mark as finished button here. That will call the pop queue method.
        

        return ( <UpdateOrderFormWrapper>

            <form onSubmit = {(evt) => { 

                evt.preventDefault(); 

                const formData = {

                     ...this.state,
                    orderer:order.orderer,
                    name: order.name,
                    orderId : order.orderId,
                    }
               
                onUpdate(formData);
            
            }}>
            
            <FormGroup>
            <Label for ="cost"> Cost </Label>
            <Field id="cost" value={this.state.cost} onChange={this.onUpdateField} />
            </FormGroup>

            <FormGroup>
            <Label for ="start"> Start Time </Label>
            <Field id="start" value={this.state.start} onChange={this.onUpdateField} />
            </FormGroup>

            <FormGroup>
            <Label for ="end"> End Time </Label>
            <Field id="end" value={this.state.end} onChange={this.onUpdateField} />
            </FormGroup>

            <FormGroup>
            <Label for ="duration"> Duration </Label>
            <Field id="duration" value={this.state.duration} onChange={this.onUpdateField} />
            </FormGroup>

            <ButtonGroup>
                <SubmitInput type="submit" value="Update" />

                {/*Feel like cancel is redundant to X, but that's usually the case*/}
                <CancelButton onClick = { (evt) => {evt.preventDefault(); leaveForm(); close()}}> Cancel </CancelButton>
            </ButtonGroup>

            </form>

        </UpdateOrderFormWrapper>);

    }

}

//I don't think I need selector for this.
function mapStateToProps(state){

    const updateOrderState = state.get("UpdateOrder");
    //Should just be local state.

    return {
        error: updateOrderState.get("error"),
        updated: updateOrderState.get("updated"),
    };
}

function mapDispatchToProps(dispatch){


    return {

        onUpdate: (formData) => {

            return dispatch(updateOrder(formData));
        },

        leaveForm : () => {

            return dispatch(leaveForm());
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

