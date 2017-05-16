import React, { Component } from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames'

class TableBodyComponent extends Component {
    render() {
        return (
            <tbody className={classnames('table__body', {
                'table__body--striped': this.props.striped,
                'table__body--condensed': this.props.condensed,
                'table__body--hover': this.props.hover,
                'table__body--bordered': this.props.bordered,
            })}>
                {this.props.children}
            </tbody>
        )
    }
}

TableBodyComponent.propTypes = {

}

export default TableBodyComponent
