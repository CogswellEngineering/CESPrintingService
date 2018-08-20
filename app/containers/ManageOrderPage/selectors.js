import { createSelector} from 'reselect';
import { MANAGE_ORDER_PATH} from 'components/Header/pages';

const selectManageOrderPage = (state) => state.get(MANAGE_ORDER_PATH);


const makeSelectError = () => createSelector(

    selectManageOrderPage,
    (manageOrderState) => {

        if (manageOrderState == null) return "";

        return manageOrderState.get("error");
    }

);

const makeSelectOrder = () => createSelector(

    selectManageOrderPage,
    (manageOrderState) => {

        if (manageOrderState == null) return null;

        return manageOrderState.get("orderInfo");
    }

);

const makeSelectReceipt = () => createSelector(

    selectManageOrderPage,
    (manageOrderState) => {

        if (manageOrderState == null) return false;

        return manageOrderState.get("receipt");
    }

)

export{

    makeSelectError,
    makeSelectOrder,
    makeSelectReceipt,
}