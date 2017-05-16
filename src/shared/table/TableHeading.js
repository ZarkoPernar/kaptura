import React, { Component } from 'react'
import PropTypes from 'prop-types'


class TableHeadingComponent extends Component {
    render() {
        return (
            <th className="table__heading">
                {this.props.children}
            </th>
        )
    }
}

TableHeadingComponent.propTypes = {

}

export default TableHeadingComponent
