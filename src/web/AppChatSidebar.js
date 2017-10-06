import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Sidebar from './shared/Sidebar'

class AppChatSidebar extends Component {
    state = {
        isOpen: false,
    }

    render() {
        return (
            <Sidebar isOpen={this.state.isOpen} right>
                <h2>Chat</h2>

            </Sidebar>
        );
    }
}

AppChatSidebar.propTypes = {

};

export default AppChatSidebar;
