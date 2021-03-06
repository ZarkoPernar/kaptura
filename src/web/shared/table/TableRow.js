import React, { Component, PureComponent } from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames'

class TableRowComponent extends PureComponent {
    static propTypes = {
        onClick: PropTypes.func,
    }

    static defaultProps = {
        onClick: () => {},
    }

    onClick = event => {
        this.props.onClick(this.props.item)
    }

    render() {
        return (
            <tr
                onClick={this.onClick}
                className={classnames('table__row', {
                    'table__row--striped': this.props.striped === true,
                    'table__row--condensed': this.props.condensed === true,
                    'table__row--hover': this.props.hover === true,
                    'table__row--bordered': this.props.bordered === true,
                    'table__row--clickable': this.props.hover === true,
                    'table__row--bg-danger': this.props.color === 'danger',
                })}
            >
                {this.props.children}
            </tr>
        )
    }
}

export default TableRowComponent
