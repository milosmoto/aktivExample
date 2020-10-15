import React from 'react';
import {connect} from "react-redux";
import { Row, Nav } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import SearchAppBar from '../ui_components/search';
import { classes } from '../ui_components/classes_design';
import PropTypes from "prop-types";
import { REACT_ROUTES } from "../../constants/react_routes";
import { getAnalytics } from "../../actions/analytic/analytic_action";
import { withRouter } from "react-router-dom";
import AnalyticTables from "./analytic_table";
import {SINGLE_OBJECT} from "../../constants/single_object_types";
import {getCountOfObjects} from "../../actions/general/general_action";

const AnalyticList = props => {
    const [search, setSearch] = React.useState('');

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        const params = `?page=${newPage+1}&&itemsPerPage=${rowsPerPage}&&name=${search}`
        props.getAnalytics(params);
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
        const params = `?page=${1}&&itemsPerPage=${+event.target.value}&&name=${search}`;
        props.getAnalytics(params);
    };

    const handleSearch = event => {
        setSearch(event.target.value);
        setPage(0);
        const params = `?page=${1}&&itemsPerPage=${rowsPerPage}&&name=${event.target.value}`;
        props.getAnalytics(params);
        props.getCountOfObjects(SINGLE_OBJECT.ANALYTIC, event.target.value);
    };

    React.useEffect(() => {
        if (!props.countObjects.entity || (props.countObjects.entity && props.countObjects.entity != SINGLE_OBJECT.ANALYTIC)) {
            props.getCountOfObjects(SINGLE_OBJECT.ANALYTIC);
        }

        const params = `?page=${page+1}&&itemsPerPage=${rowsPerPage}&&name=${search}`
        props.getAnalytics(params);

    }, []);
    const goBack = () => {
        props.history.goBack();
    };

    const goAnalyticNew = () => {
        props.history.push(REACT_ROUTES.ANALYTIC_ADD);
    };

    return (
        <div className="container-fluid  text-center" >
            <h2 className="mt-3">Analitike</h2>
            <div className="sec-nav border-bottom">
                <Nav>
                    <Nav.Item>
                        <Nav.Link onClick={() => goBack()} ><i className="fa fa-undo " aria-hidden="true"></i> Povratak nazad</Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
            <Row className="justify-content-center">
                <div className="d-inline-block">
                    <Button onClick={() => goAnalyticNew()} variant="contained" color="primary" className={`mx-2 my-2 ${classes.button}`}>
                        Kreiraj
                    </Button>
                </div>
                <div className="d-inline-block">
                    < SearchAppBar
                        handleSearch={handleSearch}
                    />
                </div>
                <AnalyticTables
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                    handleChangePage={handleChangePage}
                    page={page}
                    rowsPerPage={rowsPerPage}
                />
            </Row>
        </div>
    );
};

AnalyticList.propTypes = {
    history: PropTypes.object.isRequired,
    getAnalytics: PropTypes.func.isRequired,
    getCountOfObjects: PropTypes.func.isRequired,
    analytics: PropTypes.array,
    countObjects: PropTypes.object.isRequired
};

AnalyticList.defaultProps = {
    analytics: []
};

const mapStateToProps = (state) => ({
    analytics: state.analytics,
    countObjects: state.countObjects
});

const mapDispatchToProps = (dispatch) => ({
    getAnalytics: (data) => getAnalytics(dispatch, data),
    getCountOfObjects: (data, search) => getCountOfObjects(dispatch, data, search)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AnalyticList));
