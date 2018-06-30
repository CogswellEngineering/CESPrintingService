import { createSelector } from 'reselect';
import { ORDER_PRINT_PATH} from 'components/Header/pages';

const orderPrintPageState = (state) => state.get(ORDER_PRINT_PATH);

const createSelectShownPerPage = () => createSelector(

    orderPrintPageState,
    (orderPrintPageState) => {

        if (orderPrintPageState == null) return 5;

        return orderPrintPageState.get("shownPerPage");
    }

)

const createSelectCurrentPage = () => createSelector(

    orderPrintPageState,
    (orderPrintPageState) => {

        if (orderPrintPageState == null) return 1;

        return orderPrintPageState.get("currentPage");
    }


);

const createUploadedModelSelector = () => createSelector(

    orderPrintPageState,
    (orderPrintPageState) => {

        if (orderPrintPageState == null) return null;

        return orderPrintPageState.get("uploadedModel");
    }

)

const createQueueSelector = (prefix) =>  createSelector(

    orderPrintPageState,
    (orderPageState) => {

        if (orderPageState == null) return [];

        return orderPageState.get("queue"+prefix);
    }


);

//If they've already set model settings themselves.
const createSelectBool =  (fieldName) => createSelector(
    orderPrintPageState,
    (orderPrintPageState) => {

        if (orderPrintPageState == null) return false;

        return orderPrintPageState.get(fieldName);
    }
);

const createSelectField = (fieldName) => createSelector(
    orderPrintPageState,
    (orderPrintPageState) => {

        if (orderPrintPageState == null) return "";

        return orderPrintPageState.get(fieldName);
    }
);
//The rest are field changed stuff, I'll port over from generic selector later.

export {

    createQueueSelector,
    createSelectShownPerPage,
    createSelectCurrentPage,
    createSelectField,
    createSelectBool,
    createUploadedModelSelector,
}