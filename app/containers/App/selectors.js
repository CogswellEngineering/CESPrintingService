import { createSelector } from 'reselect';
import firebase from 'firebase';
const selectRoute = (state) => state.get('route');
const selectGlobal = (state) => state.get('CESPrintingService');


const makeSelectAuthChecked = () => createSelector(


  selectGlobal,
  (selectGlobal) => {

    if (selectGlobal == null ) return false;

    return selectGlobal.get("authChecked");
  }

)
const makeSelectFirebase = () => createSelector(

  selectGlobal,
  (selectGlobal) => {

    if (selectGlobal == null) return firebase;

    return selectGlobal.get("firebase");
  }

)

//Since it's selecting it, shouldn't it know diff?
const makeSelectLoggedIn = () => createSelector(

  selectGlobal,
  (selectGlobal) => {
    if (selectGlobal == null) {
      return {isEmpty:true};
    }


    return selectGlobal.get("loggedInUser");
  }
)

const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => routeState.get('location').toJS()
);

export {
  makeSelectLoggedIn,
  makeSelectAuthChecked,
  makeSelectLocation,
  makeSelectFirebase,
};
