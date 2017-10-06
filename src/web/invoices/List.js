import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import MdDelete from 'react-icons/lib/md/delete'

import TimeFormat from '../shared/TimeFormat'
import Pagination from '../shared/Pagination'
import Table from '../shared/table/Table'
import Button from '../shared/Button'
import TableHead from '../shared/table/TableHead'
import TableRow from '../shared/table/TableRow'
import TableCell from '../shared/table/TableCell'

const projectListColumnNames = ['Ime', 'Broj', 'Adresa', 'Opis']

const ProjectList = ({ items, rowClick, nextPage, prevPage, pageNumber, }) => (
    <div>
        <Table key="table">
            <TableHead key="head" columns={projectListColumnNames} />
            {
                items.map(invoice => {
                    return (
                        <TableRow key={invoice._id} hover condensed onClick={rowClick} item={invoice}>
                            <TableCell>
                                { invoice.name }
                            </TableCell>

                            <TableCell>
                                {invoice.account_number}
                            </TableCell>

                            <TableCell>
                                {invoice.google_address}
                            </TableCell>

                            <TableCell>
                                {invoice.notes}
                            </TableCell>
                        </TableRow>
                    )
                })
            }''
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

ProjectList.propTypes = {
    rowClick: PropTypes.func,
    rowRemove: PropTypes.func,
    activeProject: ProjectType,
    items: PropTypes.arrayOf(ProjectType),
}

export default ProjectList
