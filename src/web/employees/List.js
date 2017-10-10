import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Table from '../shared/table/Table'
import TableHead from '../shared/table/TableHead'
import TableHeading from '../shared/table/TableHeading'
import TableRow from '../shared/table/TableRow'
import TableCell from '../shared/table/TableCell'


const EmployeePropType = PropTypes.shape({
    _id: PropTypes.string,
    full_name: PropTypes.string
})

export default class EmployeeList extends PureComponent {
    static propTypes = {
        rowClick: PropTypes.func,
        rowRemove: PropTypes.func,
        activeItem: EmployeePropType,
        employees: PropTypes.arrayOf(EmployeePropType),
    }

    render() {
        return (
            <div>
                <Table key="table">
                    <TableHead key="head">
                        <TableHeading width="100px" />

                        <TableHeading>
                            Ime
                        </TableHeading>
                    </TableHead>
                    {
                        this.props.employees.map(employee => {
                            return (
                                <TableRow key={employee._id} hover condensed onClick={this.props.rowClick} item={employee}>
                                    <TableCell color={employee.isOnline === true ? 'success' : 'danger'}>
                                        { employee.isOnline === true ? 'online' : 'offline' }
                                    </TableCell>
                                    <TableCell>
                                        { employee.full_name }
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }
                </Table>
            </div>
        )
    }
}
