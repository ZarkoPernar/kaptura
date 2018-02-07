import React from 'react'
import PropTypes from 'prop-types'

import AppSidebar from './shared/AppSidebar'

const AppChatSidebar = props => {
    return (
        <AppSidebar isOpen={props.isOpen} right>
            <div style={{ minWidth: '200px', padding: '2rem 1rem' }}>
                <div className="modal__header">
                    <h3>Chat</h3>
                </div>
            </div>
        </AppSidebar>
    )
}

AppChatSidebar.propTypes = {
    isOpen: PropTypes.bool.isRequired,
}

export default AppChatSidebar
