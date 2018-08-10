import styled from 'styled-components';


//will prob change color of this.
//the font-size prob differ too.
const Input = styled.input`

   
    border:1px solid black;
    font-family: sans-serif;
    font-size: 14px;
    line-height: 20px;
    &:focus{

        
        border:1px solid #c6e28d;
        box-shadow: 0 0 2px;
        outline:none;
    }
`;

const Button = styled.button`

    border: 1px solid black;
    color:white;

    &: hover{

        background-color:gray;

    }

`;

export {
    Input,
    Button,
}

