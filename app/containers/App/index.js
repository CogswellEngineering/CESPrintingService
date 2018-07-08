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

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import OrderPrintPage from 'containers/OrderPrintPage';

import reducer from './reducer';
import saga from './saga';
import { makeSelectFirebase, makeSelectLoggedIn, makeSelectAuthChecked} from './selectors';
import { appLoaded, authChecked, login, logout, } from './actions';

var util = require('util');


class App extends Component {

  componentDidMount(){

    this.props.onLoad();

    if (!this.props.authChecked){

      //Another thing react-redux-firebase did was persistence in login.
      //Okay, only triggers on sign in and sign out.
     
      
          // console.log("cookies",this.props.cookies);

        const authToken = (this.props.cookies.get("authToken"));

        //If it's null, then means logged out.
        if (authToken == null){

          this.props.onCheckAuth();
          //Doing here instead of triggering dispatch, honestly just for now.
          //Since it doesn't do another dispatch that signout in saga is basically useless
          //since signing out here.
          this.props.firebase.auth().signOut()
          return;
        }
      

        //So this listener knows when it's signed back in
        //More and more feel like need react-redux-firebase tbh lol.
        //Could just not have profile...
      this.props.firebase.auth().onAuthStateChanged((user) => {

        

          //So signout occurs when logout pressed
          //that triggers this, which will logout in store as well.
          //And for now, retarded, but will duplicate in other services.
          //until reform to match actual sso flow
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
                      
                      const profile = this.props.cookies.get("loggedInProfile");
                      this.props.login(profile);
                
                
                  })
                  //Not sure why expiring not caught in here, but whatever.
                  .catch (err =>{
            
                    //If it fails here, 
                    this.props.onCheckAuth();
                            
                  });      
                
              }
              catch (err){
      
                //If failed then auth token likely expired. No other reason, because null was already checked for beforehand.
                //So this needs to generate a new token.
                //Then repeat sign in. feels like should be separate thing in saga
                //due to both repeating and need to yield, but 
                console.log("Err",err);        
      
              }
              
            }

          }
          else{


            //I never truly synced logging out,
            console.log("user",user);

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
      <div>
        <Header/>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path = "/order-print" component= {OrderPrintPage}/>
          <Route component={NotFoundPage} />
        </Switch>
      </div>
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
