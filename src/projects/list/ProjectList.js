import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { MdCreate, MdDelete } from 'react-icons/lib/md'

import Button from '../../shared/Button'
import TimeFormat from '../../shared/TimeFormat'
import Table from '../../shared/table/Table'
import TableHead from '../../shared/table/TableHead'
import TableRow from '../../shared/table/TableRow'
import TableBody from '../../shared/table/TableBody'
import TableCell from '../../shared/table/TableCell'

class ProjectList extends PureComponent {
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
            <div style={{padding: '0 1.75rem 1.5rem 1.75rem'}}>
                <Table key="table">
                    <TableHead key="head" columns={['Ime', 'Broj', 'Klijent', 'Adresa', 'Opis', 'Počinje', 'Završava', 'Opcije']} withindex />

                    <TableBody key="body" hover striped>
                        {
                            this.props.projects.map((ts, i) => (
                                <TableRow
                                    key={ts._id}
                                    onClick={this.getRowClick(ts)}
                                    onMouseEnter={this.mouseEnter}
                                    id={ts._id}
                                    active={this.props.activeProject !== null && this.props.activeProject._id === ts._id}>

                                    <TableCell key="index">{i+1}</TableCell>
                                    <TableCell key="name">{ts.name}</TableCell>
                                    <TableCell key="number">{ts.number}</TableCell>
                                    <TableCell key="client_name">{ts.client_name}</TableCell>
                                    <TableCell key="google_address">{ts.google_address}</TableCell>
                                    <TableCell key="description">{ts.description}</TableCell>
                                    <TableCell key="start_date">
                                        <TimeFormat>
                                            {ts.start_date}
                                        </TimeFormat>
                                    </TableCell>
                                    <TableCell key="end_date">
                                        <TimeFormat>
                                            {ts.end_date}
                                        </TimeFormat>
                                    </TableCell>

                                    <TableCell key="options">
                                        <Button iconOnly small color="danger" onClick={this.getRowRemove(ts)}>
                                            <MdDelete />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>
        )
    }
}

const ProjectType = PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string
})

ProjectList.propTypes = {
    rowClick: PropTypes.func,
    rowRemove: PropTypes.func,
    activeProject: ProjectType,
    projects: PropTypes.arrayOf(ProjectType),
}

export default ProjectList
