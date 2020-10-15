import { ANALYTIC_ACTION_TYPES } from '../../actions/analytic/analytic_action';
import {API_ROUTES} from "../../constants/api_routes";

export default function(analytics = [], action) {
    switch(action.type) {
        case ANALYTIC_ACTION_TYPES.GET_ANALYTIC_SUCCESS :
            return action.payload.map((analytic) => {
                if (typeof analytic['analyticParentCustom'] !== 'undefined') {
                    if(action.payload['analyticParentCustom']) {
                        analytic['analyticParent'] = parseInt(action.payload['analyticParentCustom'].replace(`/api${API_ROUTES.ANALYTICS_URL}/`, ''));
                    }
                    else{
                        analytic['analyticParent'] = action.payload['analyticParentCustom'];
                    }
                }

                if (analytic['endDate']) {
                    analytic['endDate'] = new Date(analytic['endDate']);
                }
                return analytic;
            });
        case ANALYTIC_ACTION_TYPES.POST_ANALYTIC_SUCCESS :
            if (typeof action.payload['analyticParentCustom'] !== undefined) {
                if(action.payload['analyticParentCustom']) {
                    action.payload['analyticParent'] = parseInt(action.payload['analyticParentCustom'].replace(`/api${API_ROUTES.ANALYTICS_URL}/`, ''));
                }
                else{
                    action.payload['analyticParent'] = action.payload['analyticParentCustom'];
                }
            }

            if (action.payload['endDate']) {
                action.payload['endDate'] = new Date(action.payload['endDate']);
            }
            return [action.payload, ...analytics];
        case ANALYTIC_ACTION_TYPES.PUT_ANALYTIC_SUCCESS :
            if (typeof action.payload['analyticParentCustom'] !== 'undefined') {
                if(action.payload['analyticParentCustom']) {
                    action.payload['analyticParent'] = parseInt(action.payload['analyticParentCustom'].replace(`/api${API_ROUTES.ANALYTICS_URL}/`, ''));
                }
                else{
                    action.payload['analyticParent'] = action.payload['analyticParentCustom'];
                }
            }

            if (action.payload['endDate']) {
                action.payload['endDate'] = new Date(action.payload['endDate']);
            }
            analytics.map((analytic, index) => {
                if (analytic.id === action.payload.id) {
                    analytics[index] = action.payload;
                }
            });
            return analytics;
        case ANALYTIC_ACTION_TYPES.DELETE_ANALYTIC_SUCCESS :
            analytics.map((analytic, index) => {
                if (analytic.id === action.payload) {
                    analytics.splice(index, 1);
                }
            });
            return analytics;
        default:
            return analytics;
    }
}
