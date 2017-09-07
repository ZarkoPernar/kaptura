import React, { PureComponent } from 'react'

import { formatDiff, formatTime } from './formatTime'
import TableRow from '../shared/table/TableRow'
import TableCell from '../shared/table/TableCell'

class LogLine extends PureComponent {
    componentWillReceiveProps(nextProps) {
        console.log('update LogLine', nextProps.item === this.props.item)
    }

    render() {
        return (
            <TableRow onClick={this.props.onSelect} item={this.props.item} hover>
                <TableCell>
                    {formatTime(this.props.item.check_in)}
                </TableCell>
                <TableCell>
                    {formatTime(this.props.item.check_out)}
                </TableCell>
                <TableCell>
                    {formatDiff(this.props.item.check_out, this.props.item.check_in)}
                </TableCell>
                <TableCell>
                    {this.props.item.project_name || '-'}
                </TableCell>
            </TableRow>
        )
    }
}

export default LogLine
