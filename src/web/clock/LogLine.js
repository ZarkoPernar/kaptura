import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { formatDiff, formatTime } from './formatTime'
import TableRow from '../shared/table/TableRow'
import TableCell from '../shared/table/TableCell'

function mapStateToProps({ employees }) {
    return {
        employees
    }
}
@connect(mapStateToProps)
class LogLine extends PureComponent {
    static defaultProps = {
        employees: {
            byId: {}
        }
    }

    getUserById = (id) => {
        if (!this.props.employees.byId) return {}

        const user = this.props.employees.byId[id] || {}

        return user
    }

    render() {
        const user = this.getUserById(this.props.item.user_id)

        return (
            <TableRow onClick={this.props.onSelect} item={this.props.item} hover>
                <TableCell>
                    {user.name}
                </TableCell>
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
