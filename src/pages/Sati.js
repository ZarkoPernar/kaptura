import React, { Component } from 'react'
import { connect } from 'react-redux'
import { denormalize } from 'normalizr'

import { updateLog, loadLogs } from '../clock/reducer'
import { list, update } from '../clock/clock.api'
import Logs from '../clock/Logs'
import { logsSchema } from '../clock/reducer'

import './sati.scss'

const mapStateToProps = state => {
    return {
        logs: denormalize(state.logs.result, logsSchema, state.logs.entities)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // loadLogs: () => dispatch(loadLogs()),
        updateLog: (log) => dispatch(updateLog(log)),
    }
}



const StoreLogs = connect(mapStateToProps, mapDispatchToProps)(Logs)

export default class SatiPage extends Component {
    componentWillMount() {
        this.refresh()
    }

    refresh = () => {
        // list().then((res) => {
        //     // this.setState(state => ({
        //     //     logs: res || state.logs
        //     // }))

        //     appStore.dispatch({
        //         type: 'ADD_LOGS',
        //         payload: res
        //     })
        // })
    }

    render() {
        return (
            <div className="Sati page--padding">
                <div className="table-holder">
                    <StoreLogs />
                </div>
            </div>
        )
    }
}
