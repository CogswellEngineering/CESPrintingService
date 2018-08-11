import styled from 'styled-components';
import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {compose} from 'redux';

import {LOGIN_PATH,REGISTER_PATH, USER_PROFILE_PATH} from 'components/Header/pages';
import reducer from './reducer';
import { createStructuredSelector } from 'reselect'; 
import { makeSelectLoggedIn, makeSelectFirebase} from 'containers/App/selectors';
import { logoutPressed} from './actions';
import injectReducer from 'utils/injectReducer';

import Popover from 'react-simple-popover';


import {
    
    LoggedOutSection,
    LogoutButton,
    LoggedInSection,
    UserActionsWrapper,
    UserActionLink,
    DisplayName,
    Button,

} from 'components/StyledComponents/UserActions';


class UserActions extends Component{
    
    
    constructor(props){

        super(props);

        this.state = {
            servicesOpen : false,
        };


        this.toggleServices = this.toggleServices.bind(this);
        this.closeServices = this.closeServices.bind(this);

    }

    toggleServices(){

        this.setState({
          servicesOpen: !this.state.servicesOpen
        });
    
        console.log("services open", this.state.servicesOpen);
      }

      closeServices(){

        this.setState({
          servicesOpen:false,
        });
      }
    
    
 
    render() {

        const props = this.props;
            if (props.firebase == null || props.profile == null){
                return null;
            }
        
            //It's stuff that should happen before anything renders.
            var actions = null;
            console.log("current user", props.firebase.auth().currentUser);
            if (props.profile.isEmpty || props.firebase.auth().currentUser == null){

                actions = (<LoggedOutSection>

                        <UserActionLink href={LOGIN_PATH}> Login </UserActionLink>
                        <UserActionLink href={REGISTER_PATH}> Register </UserActionLink>

                    </LoggedOutSection>
                )
            }

            //Otherwise render Link to profile, logout button, etc.

            if (props.firebase.auth().currentUser != null){
                
                
            
                actions = <LoggedInSection>

                            Hello, {props.profile.displayName} 

                            <UserActionLink href = {USER_PROFILE_PATH+props.firebase.auth().currentUser.uid}> Profile </UserActionLink>
                            {/*Will switch to include uid if do decide make inventory public*/}
                            <UserActionLink href = {"/account/inventory"}> Inventory </UserActionLink>
                            
                            <button  onClick = {() => {props.onLogoutPressed();}}> Logout </button>
                        
                    </LoggedInSection>

            }

            
            return  (

                <UserActionsWrapper>

                    <Button ref="target"  onClick = {this.toggleServices}> Account </Button>
                    <Popover
                        placement='bottom'
                        target={this.refs.target}
                        show={this.state.servicesOpen}
                        onHide={this.closeServices}
                    >
                        <DisplayName> {props.profile.displayName} </DisplayName>
                        <hr/>
                        {actions}

                    </Popover>

            </UserActionsWrapper>
            );


        }
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