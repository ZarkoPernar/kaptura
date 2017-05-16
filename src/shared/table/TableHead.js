import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TableHeading from './TableHeading'

class TableHeadComponent extends Component {
    renderColumns = () => {
        const cols = []
        if (this.props.withindex) {
            cols.push(<TableHeading key="index" />)
        }

        this.props.columns.forEach(col => {
            cols.push(
                <TableHeading key={col}>
                    {col}
                </TableHeading>
            )
        })

        return cols
    }

    render() {
        return (
            <thead className="table__head">
                <tr>
                    {
                        this.props.columns ?
                        this.renderColumns() :
                        this.props.children
                    }
                </tr>
            </thead>
        )
    }
}

TableHeadComponent.propTypes = {

}

export default TableHeadComponent
