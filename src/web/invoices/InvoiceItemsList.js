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

const InvoiceItemsList = ({ items, rowClick }) => (
    <div>
        <Table key="table">
            <TableHead key="head">
                <TableHeading>Stavka</TableHeading>
                <TableHeading>Tip</TableHeading>
                <TableHeading>Proizvođač</TableHeading>
                <TableHeading>Količina</TableHeading>
                <TableHeading>Cijena</TableHeading>
                <TableHeading>Opis</TableHeading>
                <TableHeading>Bilješke</TableHeading>
            </TableHead>
            {items.map(item => {
                return (
                    <TableRow
                        key={item._id}
                        hover
                        condensed
                        onClick={rowClick}
                        item={item}
                    >
                        <TableCell>{item.name}</TableCell>

                        <TableCell>{item.type}</TableCell>

                        <TableCell>{item.brand_name}</TableCell>

                        <TableCell>{item.quantity}</TableCell>

                        <TableCell>{item.price}</TableCell>

                        <TableCell>{item.description}</TableCell>

                        <TableCell>{item.notes}</TableCell>
                    </TableRow>
                )
            })}
        </Table>
    </div>
)

const InvoiceItemType = PropTypes.shape({
    _id: PropTypes.string.isRequired,
})

InvoiceItemsList.defaultProps = {
    items: [],
    rowClick: () => {},
}

InvoiceItemsList.propTypes = {
    rowClick: PropTypes.func,
    rowRemove: PropTypes.func,
    items: PropTypes.arrayOf(InvoiceItemType),
}

export default InvoiceItemsList
