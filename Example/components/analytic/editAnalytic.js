import React from 'react';
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import FormAnalytic from "./forms/formAnalytic";

const AnalyticEdit = ({history}) => {
    const { id } = useParams();
    return (
        <div>
            <FormAnalytic analyticId={id} history={history} />
        </div>
    )
};

AnalyticEdit.propTypes = {
    history: PropTypes.object.isRequired
};

export default AnalyticEdit;
