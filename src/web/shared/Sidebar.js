import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import './sidebar.scss'

const Sidebar = ({ isOpen, right, className, children }) => {
    return (
        <aside tabIndex={isOpen === true ? 0 : -1} className={classnames('App-sidebar', className, {
            'App-sidebar--is-open': isOpen,
            'App-sidebar--right': right,
        })}>
            <div className="App-sidebar__inner">
                {children}
            </div>
        </aside>
    );
};

Sidebar.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    right: PropTypes.bool,
    className: PropTypes.string,
};

export default Sidebar;
