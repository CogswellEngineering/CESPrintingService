import React from 'react';
import styled from 'styled-components';


const ReceiptPageWrapper = styled.div`



`;



export default const ReceiptPage = (props) => {



    console.log("props",props);
    //Decide on these properties first.
    const receipt = props.location.state.receipt;

    return (<ReceiptPageWrapper>

            
        
        </ReceiptPageWrapper>)

}