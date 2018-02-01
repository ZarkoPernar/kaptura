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

const projectListColumnNames = [
    'Ime',
    'Broj',
    'Klijent',
    'Adresa',
    'Opis',
    'Počinje',
    'Završava',
    'Opcije',
]

class ProjectList extends PureComponent {
    static propTypes = {
        pageNumber: PropTypes.number,
        pageSize: PropTypes.number,
        nextPage: PropTypes.func,
        prevPage: PropTypes.func,
    }

    getRowRemove = ts => {
        return e => {
            e.stopPropagation()
            this.props.rowRemove(ts)
        }
    }

    render() {
        return (
            <div>
                <Table key="table">
                    <TableHead key="head" columns={projectListColumnNames} />
                    {this.props.projects.map(project => {
                        return (
                            <TableRow
                                key={project._id}
                                hover
                                condensed
                                onClick={this.props.rowClick}
                                item={project}
                            >
                                <TableCell>{project.name}</TableCell>
                                <TableCell>{project.number}</TableCell>
                                <TableCell>{project.client_name}</TableCell>
                                <TableCell>
                                    {project.address} {project.street_number}
                                </TableCell>
                                <TableCell>{project.description}</TableCell>
                                <TableCell>
                                    <TimeFormat>
                                        {project.start_date}
                                    </TimeFormat>
                                </TableCell>
                                <TableCell>
                                    <TimeFormat>{project.end_date}</TimeFormat>
                                </TableCell>
                                <TableCell key="options">
                                    <Button
                                        iconOnly
                                        small
                                        color="danger"
                                        className="btn--table"
                                        onClick={this.getRowRemove(project)}
                                    >
                                        <MdDelete />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </Table>

                <Pagination
                    key="pages"
                    nextPage={this.props.nextPage}
                    prevPage={this.props.prevPage}
                    currentPage={this.props.pageNumber}
                />
            </div>
        )
    }
}

const ProjectType = PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
})

ProjectList.propTypes = {
    rowClick: PropTypes.func,
    rowRemove: PropTypes.func,
    activeProject: ProjectType,
    projects: PropTypes.arrayOf(ProjectType),
}

export default ProjectList
