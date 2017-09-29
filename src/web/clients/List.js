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

const projectListColumnNames = ['Ime', 'Broj', 'Adresa', 'Opis', 'Opcije']

class ProjectList extends PureComponent {
    static propTypes = {
        pageNumber: PropTypes.number,
        pageSize: PropTypes.number,
        nextPage: PropTypes.func,
        prevPage: PropTypes.func,
    }

    getRowRemove = (ts) => {
        return (e) => {
            e.stopPropagation()
            this.props.rowRemove(ts)
        }
    }

    render() {
        return (
            <div>
                <Table key="table">
                    <TableHead key="head" columns={projectListColumnNames} />
                    {
                        this.props.projects.map(project => {
                            return (
                                <TableRow key={project._id} hover condensed onClick={this.props.rowClick} item={project}>
                                    <TableCell>
                                        { project.name }
                                    </TableCell>

                                    <TableCell>
                                        {project.account_number}
                                    </TableCell>

                                    <TableCell>
                                        {project.google_address}
                                    </TableCell>

                                    <TableCell>
                                        {project.notes}
                                    </TableCell>

                                    <TableCell key="options">
                                        <Button iconOnly small color="danger" onClick={this.getRowRemove(project)}>
                                            <MdDelete />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }
                </Table>

                <Pagination key="pages"
                    nextPage={this.props.nextPage}
                    prevPage={this.props.prevPage}
                    currentPage={this.props.pageNumber} />
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
