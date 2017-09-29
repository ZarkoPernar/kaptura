import React, { Component } from 'react';

class ListFilter extends Component {
    render() {
        return (
            <div>
                { this.props.children }
            </div>
        );
    }
}

export default ListFilter;
