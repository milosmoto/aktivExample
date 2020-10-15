import React from 'react';
import PropTypes from 'prop-types';
import FormAnalytic from './forms/formAnalytic';

const ArticleAdd = props => {
    return (
        <div>
            <FormAnalytic history={props.history} />
        </div>
    )
};

ArticleAdd.propTypes = {
    history: PropTypes.object.isRequired
};

export default ArticleAdd;
