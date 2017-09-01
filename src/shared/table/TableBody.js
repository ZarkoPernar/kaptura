import React, { Component, PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import MdDelete from 'react-icons/lib/md/delete'

import Button from '../Button'
import TimeFormat from '../TimeFormat'
import TableCell from './TableCell'

const tdDescriptionStyle = { maxWidth: '300px' }
const STRING = 'string'

class TableBodyComponent extends PureComponent {

    componentWillUpdate() {
        console.log('update', 'TableBodyComponent')
    }

    getRowClick = (ts) => {
        return () => {
            this.props.rowClick(ts)
        }
    }

    getRowRemove = (ts) => {
        return (e) => {
            e.stopPropagation()
            this.props.rowRemove(ts)
        }
    }

    render() {
        return (
            <tbody className={classnames('table__body', {
                'table__body--striped': this.props.striped,
                'table__body--condensed': this.props.condensed,
                'table__body--hover': this.props.hover,
                'table__body--bordered': this.props.bordered,
                'table__body--clickable': this.props.clickable,
            })}>
                {
                    this.props.data.map((ts, i) => (
                        <tr key={ts._id} id={ts._id} onClick={this.getRowClick(ts)} className="table__row">
                            {
                                this.props.columns.map(col => {
                                    if (typeof col === STRING) {
                                        return (
                                            <TableCell key={col}>
                                                {ts[col]}
                                            </TableCell>
                                        )
                                    } else {
                                        const WrapComponent = col.wrapComponent
                                        return (
                                            <TableCell key={col.key}>
                                                <WrapComponent>
                                                    {ts[col.key]}
                                                </WrapComponent>
                                            </TableCell>
                                        )
                                    }
                                })
                            }
                            <TableCell key="options">
                                <Button iconOnly small color="danger" onClick={this.getRowRemove(ts)}>
                                    <MdDelete />
                                </Button>
                            </TableCell>
                        </tr>
                    ))
                }
            </tbody>
        )
    }
}

TableBodyComponent.propTypes = {

}

export default TableBodyComponent
