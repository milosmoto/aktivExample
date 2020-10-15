import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { REACT_ROUTES } from "../../constants/react_routes";
import { connect } from "react-redux";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { StyledTableCell, StyledTableRow, useStyles } from '../ui_components/tableStyles';
import { deleteAnalytic } from "../../actions/analytic/analytic_action";
import {formatDate} from "../../utils/helper_functions";
import { useTranslation } from "react-i18next";

const AnalyticTables = props => {
    const { t } = useTranslation();
    const classes = useStyles();
    let { analytics } = props;
    const [open, setOpen] = React.useState(false);
    const [analyticId, setAnalyticId] = React.useState(false);

    const handleClickOpen = (id) => {
        setOpen(true);
        setAnalyticId(id);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteAnalytic = () => {
        const params = `?page=${props.page+1}&&itemsPerPage=${props.rowsPerPage}`
        props.deleteAnalytic(analyticId, params);
        setAnalyticId(false);
        setOpen(false);
    };

    return (
        <Paper className={classes.root}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell key={1} >Naziv</StyledTableCell>
                        <StyledTableCell key={2} align="right">Šifra</StyledTableCell>
                        <StyledTableCell key={3} align="right">Kraj analitike</StyledTableCell>
                        <StyledTableCell key={4} align="right">Akcije</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {analytics.map(analytic => {
                        let { id, name, identifier, endDate } = analytic;
                        return (
                            <StyledTableRow hover role="checkbox" tabIndex={-1} key={id}>
                                <StyledTableCell key={`${id}1`} component="th" scope="row">
                                    <Link className={`color-blue`} to={`${REACT_ROUTES.ANALYTIC_EDIT}${id}`}>{`${name}`}</Link>
                                </StyledTableCell>
                                <StyledTableCell key={`${id}2`} align="right">{`${identifier}`}</StyledTableCell>
                                <StyledTableCell key={`${id}3`} align="right">{`${formatDate(endDate)}`}</StyledTableCell>
                                <StyledTableCell key={`${id}4`} align="right">
                                    <IconButton onClick={() => handleClickOpen(id)} aria-label="delete">
                                        <DeleteIcon/>
                                    </IconButton>
                                </StyledTableCell>
                            </StyledTableRow>
                        );
                    })}
                </TableBody>
            </Table>
            <TablePagination
                backIconButtonText={t('common:label.previous_page')}
                nextIconButtonText={t('common:label.next_page')}
                labelRowsPerPage={t('common:label.rows_per_page')}
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={props.countObjects.count}
                rowsPerPage={props.rowsPerPage}
                page={props.page}
                backIconButtonProps={{
                    'aria-label': 'previous page'
                }}
                nextIconButtonProps={{
                    'aria-label': 'next page'
                }}
                onChangePage={props.handleChangePage}
                onChangeRowsPerPage={props.handleChangeRowsPerPage}
            />
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogContent>
                    <DialogContentText>
                        Da li ste sigurni da zelite da obrisete analitiku?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Ne
                    </Button>
                    <Button onClick={deleteAnalytic} color="primary" autoFocus>
                        Da
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

AnalyticTables.propTypes = {
    search: PropTypes.string,
    analytics: PropTypes.array,
    deleteAnalytic: PropTypes.func.isRequired,
    handleChangePage: PropTypes.func.isRequired,
    handleChangeRowsPerPage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    countObjects: PropTypes.object.isRequired
};

AnalyticTables.defaultProps = {
    analytics: []
};

const mapDispatchToProps = (dispatch) => ({
    deleteAnalytic: (id, params) => deleteAnalytic(dispatch, id, params)
});

const mapStateToProps = (state) => ({
    analytics: state.analytics,
    countObjects: state.countObjects
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AnalyticTables));
