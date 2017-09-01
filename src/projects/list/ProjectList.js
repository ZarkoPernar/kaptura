import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import TimeFormat from '../../shared/TimeFormat'
import Pagination from '../../shared/Pagination'
import Table from '../../shared/table/Table'
import TableHead from '../../shared/table/TableHead'
import TableBody from '../../shared/table/TableBody'

const projectListColumnNames = ['Ime', 'Broj', 'Klijent', 'Adresa', 'Opis', 'Počinje', 'Završava', 'Opcije']
const projectListColumnProps = ['name', 'number', 'client_name', 'google_address', 'description', {
    key: 'start_date',
    wrapComponent: TimeFormat,
}, {
    key: 'end_date',
    wrapComponent: TimeFormat,
}]
class ProjectList extends PureComponent {
    static propTypes = {
        pageNumber: PropTypes.number,
        pageSize: PropTypes.number,
        nextPage: PropTypes.func,
        prevPage: PropTypes.func,
    }

    render() {
        return (
            <div>
                <Table key="table">
                    <TableHead key="head" columns={projectListColumnNames} />
                    <TableBody key="body" hover striped clickable
                        columns={projectListColumnProps}
                        data={this.props.projects}
                        rowClick={this.props.rowClick}
                        rowRemove={this.props.rowRemove} />
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
