import styled from 'styled-components';
import { Button, Input,} from 'components/StyledComponents/Generic';
import {CardNumberElement, CardCVCElement, CardExpiryElement, PostalCodeElement} from 'react-stripe-elements';
const ManageOrderWrapper = styled.div`

    width:100%;
    margin:auto;
    text-align:center;

`; 

const SummaryHeader = styled.p`

    width:80%;
    font-weight: bold;
    font-size:1.5em;
    border-bottom: 2px solid black;
    margin:auto;
`;

const PaymentInformation = styled.div`

    width:60%;
    margin:auto;
    border-bottom: 1px solid black;
    padding-bottom:5%;

`;

const PaymentLabel = styled.label`

    margin-top:2%;
`;

const PaymentField = styled(Input)`
    
    float:right;
    clear:both;
    margin-top:2%;

    margin-right:5%;
`;


const StyledCardElement = styled.div`

    width:100%;
    margin:auto;
    margin-top:5%;
    
`

const CardInfoHeader = styled.p`

    font-weight:bold;
    font-size:1.5em;
    width:80%;
    margin:auto;
    margin-top:5%;
    border-bottom:1px solid black;
`;


const StyledCardNumber = styled(CardNumberElement)`

    width:20%;
    display:inline-block;
    //Do these really need borders though?
    border:1px solid black;

`;

const StyledCVCNumber = styled(CardCVCElement)`


    display:inline-block;
    border:1px solid black;
    width:5%;
    margin-left:5%; 

`;

const StyledExpiry = styled(CardExpiryElement)`
    
    display:inline-block;
    border:1px solid black;
    width:8%;
    margin-left:5%; 

`;

const StyledPostal = styled(PostalCodeElement)`

    display:inline-block;
    width:6%;
    border:1px solid black;
    margin-left:5%; 

`




const SubmitButton = styled(Button)`

    text-align:center;
    margin-top:5%;
`;

const CancelButton = styled(Button)`

    text-align:center;
    margin-top:5%;
    margin-left:5%;
    
`;



const ReviewOrder = styled.div`

    margin-top:2.5%;

`;

const OrderField = styled.p`


`;


 

export{
    
    ManageOrderWrapper,
    SummaryHeader,
    ReviewOrder,
    OrderField,
    PaymentInformation,
    PaymentLabel,
    PaymentField,
    StyledCardElement,
    CardInfoHeader,
    StyledCardNumber,
    StyledCVCNumber,
    StyledPostal,
    StyledExpiry,
    SubmitButton,
    CancelButton,
    
}