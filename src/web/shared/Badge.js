import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import './badge.scss'

const Badge = props => {
    return (
        <div className={classnames('badge', props.color !== undefined ? 'badge--' + props.color : '')}>
            {props.children}
        </div>
    );
};

Badge.propTypes = {

};

export default Badge;
