import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Table from '../shared/table/Table'
import TableHead from '../shared/table/TableHead'
import TableRow from '../shared/table/TableRow'
import TableCell from '../shared/table/TableCell'
import TimeFormat from '../shared/TimeFormat'
import TimeDurationFormat from '../shared/TimeDurationFormat'
import TimeDiffFormat from '../shared/TimeDiffFormat'

const columns = [
    'Zaposlenik',
    'Početak',
    'Kraj',
    'Trajanje',
    'Broj Sati',
    'Projekt',
    'Klijent',
]

export const TimesheetList = ({ employees, timesheets, onSelect }) => {
    return (
        <Table>
            <TableHead columns={columns} />

            {timesheets.map(item => {
                const employee = employees.byId[item.user_id]
                const employeeName = employee !== undefined ? employee.name : ''

                return (
                    <TableRow
                        onClick={onSelect}
                        item={item}
                        hover
                        key={item._id}
                    >
                        <TableCell>{employeeName}</TableCell>
                        <TableCell>
                            <TimeFormat>{item.check_in}</TimeFormat>
                        </TableCell>
                        <TableCell>
                            <TimeFormat>{item.check_out}</TimeFormat>
                        </TableCell>
                        <TableCell>
                            <TimeDurationFormat
                                start={item.check_in}
                                stop={item.check_out}
                            />
                        </TableCell>
                        <TableCell>
                            <TimeDiffFormat
                                start={item.check_in}
                                stop={item.check_out}
                            />
                        </TableCell>
                        <TableCell>{item.project_name || ''}</TableCell>
                        <TableCell>{item.client_name || ''}</TableCell>
                    </TableRow>
                )
            })}
        </Table>
    )
}

TimesheetList.propTypes = {
    timesheets: PropTypes.array.isRequired,
    employees: PropTypes.object.isRequired,
}
TimesheetList.defaultProps = {
    timesheets: [],
    employees: {
        byId: {},
    },
}

export default TimesheetList
