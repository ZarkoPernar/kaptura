import React from 'react'
import PropTypes from 'prop-types'

import Sidebar from './shared/Sidebar'

const AppChatSidebar = props => {
    return (
        <Sidebar isOpen={props.isOpen} right>
            <div style={{minWidth: '200px', padding: '2rem 1rem'}}>
                <div className="modal__header">
                    <h3>Chat</h3>
                </div>
            </div>

        </Sidebar>
    )
}

AppChatSidebar.propTypes = {
    isOpen: PropTypes.bool.isRequired,
}

export default AppChatSidebar
