import styled from 'styled-components';
import React from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {compose} from 'redux';

//Elements such as login, register, logout, userprofile, etc.
import {LOGIN_PATH,REGISTER_PATH, USER_PROFILE_PATH} from 'components/Header/pages';
import reducer from './reducer';
import { createStructuredSelector } from 'reselect'; 
import { makeSelectLoggedIn, makeSelectFirebase} from 'containers/App/selectors';
import { logoutPressed} from './actions';
import injectReducer from 'utils/injectReducer';

import {
    
    LoggedOutSection,
    LoggedInSection,
    UserActionLink,

} from 'components/StyledComponents/UserActions';


const UserActions  = (props) => {
    
    console.log("login path",LOGIN_PATH);
    console.log("props",props);
       //Just so that all pops up at once, instead of delay on display name.
    if (props.firebase == null || props.profile == null){
        return null;
    }
    //It's stuff that should happen before anything renders.

     if (props.profile.isEmpty || props.firebase.auth().currentUser == null){

        return (<LoggedOutSection>

                <UserActionLink href={LOGIN_PATH}> Login </UserActionLink>
                <UserActionLink href={REGISTER_PATH}> Register </UserActionLink>

            </LoggedOutSection>
        )
    }

    //Otherwise render Link to profile, logout button, etc.
    const profilePath = USER_PROFILE_PATH.split(":")[0];

    
 
    return (
        <LoggedInSection>

                Hello, {props.profile.displayName} 

                <UserActionLink to = {profilePath+props.firebase.auth().currentUser.uid}> Profile </UserActionLink>
                {/*Will switch to include uid if do decide make inventory public*/}
                <UserActionLink to = {"/account/inventory"}> Inventory </UserActionLink>
                
                <button  onClick = {() => {props.onLogoutPressed();}}> Logout </button>
            
        </LoggedInSection>
    )    


}


const mapStateToProps = createStructuredSelector({

    profile : makeSelectLoggedIn(),
    firebase : makeSelectFirebase(),
    
});

function mapDispatchToProps(dispatch){

    return {

        onLogoutPressed: () => {

            return dispatch(logoutPressed());
        },
    }

}


const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({key:"UserActions",reducer});
export default compose(
    withConnect,
    withReducer,
)(UserActions);