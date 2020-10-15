import { postData, putData } from "../../http/request";
import { ENTRYPOINT } from "../../config/entrypoint";
import { API_ROUTES } from "../../constants/api_routes";
import history from '../../history';
import {SINGLE_OBJECT} from "../../constants/single_object_types";
import {GENERAL_ACTION_TYPES} from "../general/general_action";

export const ANALYTIC_ACTION_TYPES = {
    GET_ANALYTIC: 'GET_ANALYTIC',
    GET_ANALYTIC_SUCCESS: 'GET_ANALYTIC_SUCCESS',
    DELETE_ANALYTIC: 'DELETE_ANALYTIC',
    DELETE_ANALYTIC_SUCCESS: 'DELETE_ANALYTIC_SUCCESS',
    POST_ANALYTIC: 'POST_ANALYTIC',
    POST_ANALYTIC_SUCCESS: 'POST_ANALYTIC_SUCCESS',
    PUT_ANALYTIC_SUCCESS: 'PUT_ANALYTIC_SUCCESS'
};

export function getAnalytics(dispatch, params) {
    dispatch({
        type: ANALYTIC_ACTION_TYPES.GET_ANALYTIC,
        params
    });
}

export function deleteAnalytic(dispatch, id, params) {
    dispatch({
        type: ANALYTIC_ACTION_TYPES.DELETE_ANALYTIC,
        id,
        params
    });
}

export function postAnalytic(params, redirect) {
    return async (dispatch) => {
        const response = await postData(`${ENTRYPOINT}${API_ROUTES.ANALYTICS_URL}`, params);
        dispatch({type: ANALYTIC_ACTION_TYPES.POST_ANALYTIC_SUCCESS, payload: response});
        dispatch({type: GENERAL_ACTION_TYPES.INCREASE_COUNT_OBJECTS_SUCCESS, payload: SINGLE_OBJECT.ANALYTIC});
        if (redirect) {
            history.goBack();
        }
        return response;
    };
}

export function putAnalytic(params) {
    return async (dispatch) => {
        const response = await putData(`${ENTRYPOINT}${API_ROUTES.ANALYTICS_URL}/${params.id}`, params);
        dispatch({type: ANALYTIC_ACTION_TYPES.PUT_ANALYTIC_SUCCESS, payload: response});
        response['singleObject'] = SINGLE_OBJECT.ANALYTIC
        dispatch({type: GENERAL_ACTION_TYPES.UPDATE_SINGLE_OBJECT_SUCCESS, payload: response});
        history.goBack();
    };
}
