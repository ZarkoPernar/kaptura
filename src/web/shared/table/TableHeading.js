import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'


class TableHeadingComponent extends PureComponent {
    render() {
        return (
            <th className="table__heading" style={{ width: this.props.width !== undefined ? this.props.width : ''}}>
                {this.props.children}
            </th>
        )
    }
}

TableHeadingComponent.propTypes = {

}

export default TableHeadingComponent
