import styled from 'styled-components';
import Pagination from 'rc-pagination';
//Forgot did reactstrap for alot of theses
import {DropdownMenu, Dropdown, FormGroup, Form, DropdownItem, DropdownToggle, Button, CustomInput } from 'reactstrap';
import Modal from 'react-responsive-modal';
import DropZone from 'react-dropzone';
import {Input } from 'components/StyledComponents/Generic';



const OrderPrintPageWrapper = styled.div`


    width:80%;
    margin:auto;


`
const ErrorMessage = styled.p`

    color:red;
`


const DropZoneModel = styled(DropZone)`

    margin-top:2%;
    border: ${props => props.modeluploaded == 'true'? '2px solid white' : '2px dashed black'};
    text-align:center;
    width:50%;
    float:left;
    height:30em;
`;

const UploadOptions = styled.div`

    margin:auto;
    width:60%;
    margin-top:25%;

`;

const OrderAgainButton = styled(Button)`

`;

const UploadModelButton = styled.label`

    text-align:center;
    width:100%;
    border: 1px solid black;
    background-color: green;
    color:white;
    padding-bottom:10px;
`;

const RecentOrdersButton = styled.button`


     border: 1px solid green;
     width:100%;
    padding-bottom:10px;

     
     color:green;
`;

const RecentOrdersModal = styled(Modal)`


`;

const PurchaseForm = styled(Form)`
    width:45%;
    margin-left:2%;
    float:left;
`;

const MaterialSelection = styled(FormGroup)`


`

const StyledDropdownItem = styled(DropdownItem)`

    width:400px;
    

`

const StyledDropdownToggle = styled(DropdownToggle)`

    width:400px;
    text-align:left;
    
`

const ColorSelection = styled(FormGroup)`

    clear:both;
`
const DropdownCaret = styled.img`

    float:right;
    height:20px;

`;



const QueuePagination = styled(Pagination)`

    margin-left:40%;
    margin-top:10%;

`


const DimensionsImage = styled.img`


    height:100px;
    width:50%;
    margin:auto;
    display:block;
`
const DimensionsInput = styled(Input)`

    width:20%;
    height:2.5em;
    text-align:center;
    margin-left:5%;
    margin-top:4%;

`

const OrderInfo = styled.span`

    width:10%;
    margin-left:1%;

`

const PrintQueue = styled.ul`

    margin-top :10%;
    border:2px solid black;
`

const PrintQueueHeader = styled.h1`

    text-align:center;
`

const OrderPrintSubmit = styled(Input)`

    width:80%;
    margin-top:10%;
    &:hover{
        background-color: #9dabb7;
    }
    text-align:center;

`;

export{

    OrderPrintPageWrapper,
    OrderInfo,
    OrderPrintSubmit,
    PrintQueue,
    PrintQueueHeader,
    QueuePagination,
    PurchaseForm,
    ColorSelection,
    MaterialSelection,
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
    ErrorMessage,

}