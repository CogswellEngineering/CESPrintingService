import { createSelector} from 'reselect;
import { RECEIPT_PAGE_PATH} from 'components/Header/pages';

const selectReceiptPage = (state) => state.get(RECEIPT_PAGE_PATH);


const makeSelectError = () => createSelector(

    selectReceiptPage,
    (receiptState) => {

        if (receiptState == null) return "";

        return receiptState.get("error");
    }

);

const makeSelectOrder = () => createSelector(

    selectReceiptPage,
    (receiptState) => {

        if (receiptState == null) return null;

        return receiptState.get("orderInfo");
    }

);

const makeSelectOrderCharged = () => createSelector(

    selectReceiptPage,
    (receiptState) => {

        if (receiptState == null) return false;

        return receiptState.get("orderConfirmed");
    }

)

export{

    makeSelectError,
    makeSelectOrder,
    makeSelectOrderCharged,
}