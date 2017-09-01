import React, { PureComponent } from 'react'

import { addProjectToItem } from '../projects/utils'
import LogLine from './LogLine'

const thStyle = {
    width: '25%',
}

export default class Items extends PureComponent {
    static defaultProps = {
        logs: []
    }

    state = {
        showProjectSelect: {},
    }

    onProjectSelect = (project, originalItem) => {
        this.props.updateLog(
            addProjectToItem(originalItem, project)
        )
    }

    toggleProjectSelect = (item) => {
        const nextState = {
            ...this.state.showProjectSelect,
            [item._id]: !this.state.showProjectSelect[item._id]
        }

        this.setState({
            showProjectSelect: nextState
        })
    }

    render() {
        const logs = [...this.props.logs].reverse()

        return (
            <table className="table">
                <thead>
                    <tr>
                        <th className="table__heading" style={thStyle}>Početak</th>
                        <th className="table__heading" style={thStyle}>Kraj</th>
                        <th className="table__heading" style={thStyle}>Trajanje</th>
                        <th className="table__heading" style={thStyle}>Projekt</th>
                    </tr>
                </thead>
                <tbody className="table__body table__body--striped table__body--hover table__body--clickable">
                    { logs.map((item) => (
                        <LogLine
                            key={item._id}
                            onProjectSelect={this.onProjectSelect}
                            toggleProjectSelect={this.toggleProjectSelect}
                            showProjectSelect={this.state.showProjectSelect[item._id]}
                            item={item} />
                        ))
                    }
                </tbody>
            </table>
        )
    }
}
