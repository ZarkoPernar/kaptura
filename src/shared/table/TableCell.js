import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames'

class TableBodyComponent extends PureComponent {

    static propTypes = {

    }

    // static contextTypes = {
    //     cellClick: PropTypes.func,
    // }
    // onClick={this.context.cellClick}

    render() {
        return (
            <td className={classnames('table__cell', { 'table__cell--active': this.props.active, })} {...this.props}>
                <div className="table__cell__content">
                    {this.props.children}
                </div>
            </td>
        )
    }
}


export default TableBodyComponent
