import React, { Component } from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames'

class TableBodyComponent extends Component {

    static propTypes = {

    }

    // static contextTypes = {
    //     cellClick: PropTypes.func,
    // }
    // onClick={this.context.cellClick}

    render() {
        return (
            <td className={classnames('table__cell', { 'table__cell--active': this.props.active, })}>
                {this.props.children}
            </td>
        )
    }
}


export default TableBodyComponent
