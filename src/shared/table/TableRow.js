import React, { Component } from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames'

class TableRowComponent extends Component {
    static propTypes = {

    }

    render() {
        const { active, children, ...rest } = this.props
        return (
            <tr className={classnames('table__row', {
                'table__row--active': active === true,
                'table__row--clickable': this.props.onClick !== undefined,
            })} {...rest}>
                {children}
            </tr>
        )
    }
}

export default TableRowComponent
