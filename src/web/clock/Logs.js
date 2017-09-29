import React, { PureComponent } from 'react'

import Table from '../shared/table/Table'
import TableHead from '../shared/table/TableHead'
import { getId } from '../utils/array.utils'
import LogLine from './LogLine'

const columns = ['Zaposlenik', 'Početak', 'Kraj', 'Trajanje', 'Projekt']

export default class Items extends PureComponent {
    static defaultProps = {
        logs: []
    }

    render() {
        return (
            <Table>
                <TableHead columns={columns} />
                {
                    this.props.logs.map(item => (
                        <LogLine
                            key={item._id}
                            item={item}
                            onSelect={this.props.onSelect} />
                    ))
                }
            </Table>
        )
    }
}
