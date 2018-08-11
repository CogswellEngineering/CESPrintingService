/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React, {Component} from 'react';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import { compose} from 'redux';
import { createStructuredSelector} from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import HomePage from 'containers/HomePage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import OrderPrintPage from 'containers/OrderPrintPage';
import { withCookies, } from 'react-cookie';

import reducer from './reducer';
import saga from './saga';
import { makeSelectFirebase, makeSelectLoggedIn, makeSelectAuthChecked} from './selectors';
import { appLoaded, authChecked, login, logout, } from './actions';
import {homeURL } from 'components/Header/pages';

var util = require('util');
const AppWrapper = styled.div`


    height:auto;

`;

const BodyWrapper = styled.div`

    width:80%;
    margin:auto;
    height:80%;
   
    clear:both;
    margin-top:20px;


`;

const FootWrapper = styled.div`

  border:2px solid green;
  margin:auto;
  margin-top:24px;
  height:200px;
  width:80%;
      
`;


class App extends Component {

  componentDidMount(){

    this.props.onLoad();

    if (!this.props.authChecked){

        const authToken = (this.props.cookies.get("authToken"));

        //If it's null, then means logged out.
        if (authToken == null){

          console.log("am i happen?");
          this.props.onCheckAuth();
        }


          
      

    
      this.props.firebase.auth().onAuthStateChanged((user) => {

        

          //So signout occurs when logout pressed
          //that triggers this, which will logout in store as well.
          if (!user) {
          
            //Once logged out this should remove the cookies if it exists.
            //Cause if not empty means logout was pressed and signed out of firebase auth.
            if (!this.props.loggedInUser.isEmpty){

              this.props.logout();
              this.props.cookies.remove("authToken");
              this.props.cookies.remove("loggedInProfile");
            }
            else{


              try{
  
                this.props.firebase.auth().signInWithCustomToken(authToken)
                  .then (res => {
                      this.props.onCheckAuth();
                      
                      //Honestly, I could just use react-redux-firebase here too, it would be easier...
                      const profile = this.props.cookies.get("loggedInProfile");
                      console.log("profle in cookies", profile);
                      this.props.login(profile);
                
                
                  })
                  .catch (err =>{
            
                    //If it fails here,
                    console.log("fail, expired token");
                    this.props.onCheckAuth();
                            
                  });      
                
              }
              catch (err){
      
                //If failed then auth token likely expired. No other reason, because null was already checked for beforehand.
                //So this needs to generate a new token.
                //Then repeat sign in. feels like should be separate thing in saga
                //due to both repeating and need to yield.
                /*Edit: Will just start using a SSO frameowork like github OAuth, I learned from this experience
                and know that just need to generate refresh token, to pass in to generate an auth token for same user
                in my server app. Might still do that for my own learning, but for sake of quality will likely start using a framework instead.*/ 
                console.log(err);        
      
              }
              
            }

          }
          else{
            const profile = this.props.cookies.get("loggedInProfile");
            this.props.login(profile);
            this.props.onCheckAuth();
      
          }
         
         
        });
       
        
      }
     
    }


  render(){

    //Okay for now, but google let's it stay on same page while cookies are being checked
    if (!this.props.authChecked){
        return null;
    }
    return (
      <AppWrapper>
        <Header/>

        <BodyWrapper>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path = "/order-print" component ={OrderPrintPage}/>
          <Route component={NotFoundPage} />
        </Switch>
        </BodyWrapper>

        <Footer/>

      </AppWrapper>
    );
  }
}


const mapStateToProps = createStructuredSelector({

  loggedInUser : makeSelectLoggedIn(),
  firebase : makeSelectFirebase(),
  authChecked :  makeSelectAuthChecked(),
});

function mapDispatchToProps(dispatch) {

  return {


    //Onload not working anymore if firebase in initial state is fine.

    logout : () => {
      
      return dispatch(logout());
    },

    login : (userProfile) => {

      return dispatch(login(userProfile))
    },

    onLoad : () => {

        return dispatch(appLoaded());
    },

    onCheckAuth : () =>{

        return dispatch(authChecked());
    }

  }
}


const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({key:"CESPrintingService",reducer});
const withSaga = injectSaga({key:"CESPrintingService",saga});

export default compose(
  withCookies, 
  withConnect,
  withReducer,
  withSaga,
)(App);