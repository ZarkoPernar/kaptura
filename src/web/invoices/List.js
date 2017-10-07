import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import MdDelete from 'react-icons/lib/md/delete'
import { Link } from 'react-router-dom'

import TimeFormat from '../shared/TimeFormat'
import Pagination from '../shared/Pagination'
import Table from '../shared/table/Table'
import Button from '../shared/Button'
import TableHead from '../shared/table/TableHead'
import TableRow from '../shared/table/TableRow'
import TableCell from '../shared/table/TableCell'

const projectListColumnNames = ['Projekt', 'Klijent', 'Izdao', 'Izdat', 'Dospjece', 'Zapis']

const ProjectList = ({ items, rowClick, nextPage, prevPage, pageNumber, }) => (
    <div>
        <Table key="table">
            <TableHead key="head" columns={projectListColumnNames} />
            {
                items.map(invoice => {
                    return (
                        <TableRow key={invoice._id} hover condensed onClick={rowClick} item={invoice}>
                            <TableCell>
                                <Link className="" to={{
                                    pathname: '/fakture/' + invoice._id,
                                    state: {
                                        invoice,
                                    },
                                }}>
                                    { invoice.project ? invoice.project.name : '' }
                                </Link>
                            </TableCell>

                            <TableCell>
                                { invoice.client ? invoice.client.name : '' }
                            </TableCell>

                            <TableCell>
                                { invoice.issued_by ? invoice.issued_by.name : '' }
                            </TableCell>

                            <TableCell>
                                { invoice.issue_date }
                            </TableCell>

                            <TableCell>
                                { invoice.due_date }
                            </TableCell>

                            <TableCell>
                                { invoice.notes }
                            </TableCell>
                        </TableRow>
                    )
                })
            }
        </Table>

        <Pagination key="pages"
            nextPage={nextPage}
            prevPage={prevPage}
            currentPage={pageNumber} />
    </div>
)

const ProjectType = PropTypes.shape({
    _id: PropTypes.string.isRequired,
})

ProjectList.defaultProps = {
    rowClick: () => {},
}

ProjectList.propTypes = {
    rowClick: PropTypes.func,
    rowRemove: PropTypes.func,
    activeProject: ProjectType,
    items: PropTypes.arrayOf(ProjectType),
}

export default ProjectList
