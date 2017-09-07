import React, { Component, PureComponent } from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames'

const FUNC = 'function'
class TableRowComponent extends PureComponent {
    static propTypes = {

    }

    onClick = (event) => {
        this.props.onClick(this.props.item)
    }

    render() {
        return (
            <tr onClick={this.onClick} className={classnames('table__row', {
                'table__row--striped': this.props.striped === true,
                'table__row--condensed': this.props.condensed === true,
                'table__row--hover': this.props.hover === true,
                'table__row--bordered': this.props.bordered === true,
                'table__row--clickable': typeof this.props.onClick === FUNC,
            })}>
                { this.props.children }
            </tr>
        )
    }
}

export default TableRowComponent
