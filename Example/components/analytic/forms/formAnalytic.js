import React from 'react';
import {connect} from "react-redux";
import DatePickerRedux from "../../ui_components/datepicker";
import TextInput from "../../ui_components/text_input";
import PropTypes from "prop-types";
import { postAnalytic, putAnalytic, getAnalytics } from "../../../actions/analytic/analytic_action";
import { API_ROUTES } from "../../../constants/api_routes";
import Grid from '@material-ui/core/Grid';
import { reduxForm } from "redux-form";
import { Container, Form } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {SINGLE_OBJECT} from "../../../constants/single_object_types";
import {ENTRYPOINT} from "../../../config/entrypoint";
import {getSingleObject} from "../../../actions/general/general_action";
import Autocomplete from "../../ui_components/autocomplete";
import {cloneObject} from "../../../utils/helper_functions";

const AnalyticForm = props => {
    React.useEffect(() => {

        if (props.analyticId) {
            let analyticInit = {};
            if(Object.keys(props.singleObject).length && props.singleObject.id === props.analyticId && SINGLE_OBJECT.ANALYTIC === props.singleObject.singleObject){
                analyticInit = props.singleObject;
            }
            else{
                const url = `${ENTRYPOINT}${API_ROUTES.ANALYTICS_URL}/${props.analyticId}`;
                props.getSingleObject({url:url, singleObject:SINGLE_OBJECT.ANALYTIC});
            }

            props.initialize(analyticInit);
        }
    }, []);

    React.useEffect(() => {
        if (props.analyticId && props.analyticId === props.singleObject.id) {
            let analyticInit = {};
            analyticInit = props.singleObject

            props.initialize(analyticInit);
        }
    }, [props.singleObject]);

    const handleAddAnalytic = (datas) => {
        const data = cloneObject(datas);
        if(data['analyticParent'] !== undefined){
            data['analyticParent'] = `/api${API_ROUTES.ANALYTICS_URL}/${data['analyticParent']}`;
        }
        if (typeof data['id'] !== 'undefined') {
            return props.putAnalytic(data);
        }
        else {
            if (typeof props.handleClose !== 'undefined') {
                props.postAnalytic(data, false)
                    .then((data) => {
                        props.initializeObject(data.id);
                    });
                return props.handleClose();
            }
            else {
                return props.postAnalytic(data, true);
            }
        }
    };

    const goBack = () => {
        props.history.goBack();
    };

    const { error, handleSubmit } = props;

    return (
        <div className="search-dox text-left pt-5">
            <div className="container-fluid  text-center" >
                <Typography variant="h3" component="h2">
                    Analitike
                </Typography>
            </div>
            <Container className="container">
                <Form onSubmit={handleSubmit(handleAddAnalytic)}>
                    <Typography variant="h1" component="h2">
                        <Button className={`mx-2`} variant="contained" size="small" color="primary" type="submit">
                            Sacuvaj
                        </Button>
                        <Button className={`mx-2`} variant="contained" size="small" color="default" onClick={typeof props.handleClose !== 'undefined' ? () => props.handleClose() : () => goBack(props)}>
                            Nazad
                        </Button>
                    </Typography>
                    {error && <strong className={`text-danger`}>{error}</strong>}
                    <Grid container justify="center" spacing={1}>
                        <Grid item xs={12} md={8}>
                            <TextInput
                                name={`name`}
                                required={true}
                                label={`Naziv analitike *`}
                                type={`text`}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <TextInput
                                name={`identifier`}
                                label={`Šifra`}
                                type={`text`}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <DatePickerRedux
                                name={`endDate`}
                                label={`Kraj analitike`}
                                placeholder={`Kraj analitike`}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Autocomplete
                                isClearable
                                name={`analyticParent`}
                                type="text"
                                url={API_ROUTES.ANALYTICS_URL}
                                items={[]}
                                fullWidth
                                label={`Visa analitika`}
                                placeholder={`Visa analitika`}
                            />
                        </Grid>
                    </Grid>
                </Form>
            </Container>
        </div>
    );
};

function validate(values) {
    const errors = {};

    if (!values.name) {
        errors.name = "Unesite naziv analitike";
    }

    return errors;
}

AnalyticForm.propTypes = {
    history: PropTypes.object.isRequired,
    singleObject: PropTypes.object.isRequired,
    analyticId: PropTypes.string,
    analytics: PropTypes.array,
    error: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
    postAnalytic: PropTypes.func.isRequired,
    putAnalytic: PropTypes.func.isRequired,
    getAnalytics: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
    handleClose: PropTypes.func,
    initializeObject: PropTypes.func,
    getSingleObject: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    analytics: state.analytics,
    singleObject: state.singleObject
});

const mapDispatchToProps = (dispatch) => ({
    putAnalytic: (data) => dispatch(putAnalytic(data)),
    postAnalytic: (data, redirect) => dispatch(postAnalytic(data, redirect)),
    getAnalytics: (data) => getAnalytics(dispatch, data),
    getSingleObject: (data) => getSingleObject(dispatch, data)
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    validate,
    form: 'AnalyticForm'
})(AnalyticForm));
