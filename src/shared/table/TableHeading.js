import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'


class TableHeadingComponent extends PureComponent {
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
