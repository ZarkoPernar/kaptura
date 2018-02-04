import React from 'react'
import PropTypes from 'prop-types'
import MdCheck from 'react-icons/lib/md/check'
import { Link } from 'react-router-dom'

import DisplayDate from '../shared/DisplayDate'
import Pagination from '../shared/Pagination'
import Table from '../shared/table/Table'
import TableHead from '../shared/table/TableHead'
import TableHeading from '../shared/table/TableHeading'
import TableRow from '../shared/table/TableRow'
import TableCell from '../shared/table/TableCell'

import { isInvoicePassedDue } from './utils'

const ProjectList = ({ items, rowClick, nextPage, prevPage, pageNumber }) => (
    <div>
        <Table key="table">
            <TableHead key="head">
                <TableHeading width="1%">Placeno</TableHeading>
                <TableHeading>Broj</TableHeading>
                <TableHeading>Projekt</TableHeading>
                <TableHeading>Klijent</TableHeading>
                <TableHeading>Izdao</TableHeading>
                <TableHeading>Datum izdavanja</TableHeading>
                <TableHeading>Rok Placanja</TableHeading>
                <TableHeading>Biljeske</TableHeading>
            </TableHead>
            {items.map(invoice => {
                return (
                    <TableRow
                        key={invoice._id}
                        // hover
                        condensed
                        // onClick={rowClick}
                        item={invoice}
                        color={
                            !invoice.payment_received &&
                            isInvoicePassedDue(invoice.due_date) === true
                                ? 'danger'
                                : ''
                        }
                    >
                        <TableCell center>
                            <span style={{ fontSize: '1.5rem', lineHeight: 0 }}>
                                {invoice.payment_received === true ? (
                                    <MdCheck />
                                ) : null}
                            </span>
                        </TableCell>

                        <TableCell>
                            <Link
                                className=""
                                to={{
                                    pathname: '/fakture/' + invoice._id,
                                    state: {
                                        invoice,
                                    },
                                }}
                            >
                                {invoice.number ? invoice.number : 'Nema Broj'}
                            </Link>
                        </TableCell>

                        <TableCell>
                            {invoice.project ? invoice.project.name : ''}
                        </TableCell>

                        <TableCell>
                            {invoice.client ? invoice.client.name : ''}
                        </TableCell>

                        <TableCell>
                            {invoice.issued_by ? invoice.issued_by.name : ''}
                        </TableCell>

                        <TableCell>
                            <DisplayDate>{invoice.issue_date}</DisplayDate>
                        </TableCell>

                        <TableCell>
                            <DisplayDate>{invoice.due_date}</DisplayDate>
                        </TableCell>

                        <TableCell>{invoice.notes}</TableCell>
                    </TableRow>
                )
            })}
        </Table>

        <Pagination
            key="pages"
            nextPage={nextPage}
            prevPage={prevPage}
            currentPage={pageNumber}
        />
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
