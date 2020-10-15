import { takeEvery, put, call } from 'redux-saga/effects';
import { API_ROUTES } from "../../constants/api_routes";
import {deleteData, getData} from "../../http/request";
import { ENTRYPOINT } from "../../config/entrypoint";
import { ANALYTIC_ACTION_TYPES } from "./analytic_action";
import history from "../../history";
import {REACT_ROUTES} from "../../constants/react_routes";
import {GENERAL_ACTION_TYPES} from "../general/general_action";
import {SINGLE_OBJECT} from "../../constants/single_object_types";

export function* getAnalytics(params) {
    let response;
    if(params.params != undefined) {
        response = yield call(getData, `${ENTRYPOINT}${API_ROUTES.ANALYTICS_URL}${params.params}`);
    }
    else{
        response = yield call(getData, `${ENTRYPOINT}${API_ROUTES.ANALYTICS_URL}`);
    }
    yield put({ type: ANALYTIC_ACTION_TYPES.GET_ANALYTIC_SUCCESS, payload: response });
}
export function* deleteAnalytic(data) {
    yield call(deleteData, `${ENTRYPOINT}${API_ROUTES.ANALYTICS_URL}/${data.id}`);
    yield put({ type: ANALYTIC_ACTION_TYPES.DELETE_ANALYTIC_SUCCESS, payload: data.id });
    yield put({ type: GENERAL_ACTION_TYPES.REDUCE_COUNT_OBJECTS_SUCCESS, payload: SINGLE_OBJECT.ANALYTIC});
    const response = yield call(getData, `${ENTRYPOINT}${API_ROUTES.ANALYTICS_URL}${data.params}`);
    yield put({ type: ANALYTIC_ACTION_TYPES.GET_ANALYTIC_SUCCESS, payload: response });
    history.push(REACT_ROUTES.ANALYTIC);
}

export default function* analytic_saga() {
    yield takeEvery(ANALYTIC_ACTION_TYPES.GET_ANALYTIC, getAnalytics);
    yield takeEvery(ANALYTIC_ACTION_TYPES.DELETE_ANALYTIC, deleteAnalytic);
}
