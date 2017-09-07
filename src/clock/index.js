import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import MdPlay from 'react-icons/lib/md/play-arrow'
import MdStop from 'react-icons/lib/md/stop'
import { v4 as uid } from 'uuid'

import * as apiService from '../shared/apiService'
import Button from '../shared/Button'
import appTitle from '../shared/appTitle'

import { isUnfinished, getLast, inOut } from './clock'
import { selector, loadLogs, addLog, updateLog } from './reducer'
import DisplayDuration from './DisplayDuration'

import './clock.scss'

const DEFAULT_TITLE = 'Clock'

export class Clock extends PureComponent {
    static defaultProps = {
        logs: []
    }

    state = {
        user: {},
    }

    componentWillMount() {
        this.refresh()
        this.getUser()
        // this.setState(state => ({
        //     logs: getFromStorage(state.logs)
        // }))
    }

    componentDidMount() {
        this.appTitle = appTitle(window.document)
    }

    getUser = () => {
        apiService.get('/user/userInfo')
            .then((res) => {
                this.setState({
                    user: res,
                })
            })
            .catch((err) => {
                console.error(err)
            })
    }

    refresh = () => {
        this.props.loadLogs()
    }

    click = () => {
        if (isUnfinished(this.props.logs)) {
            const log = inOut(getLast(this.props.logs))

            this.appTitle.setTitle(DEFAULT_TITLE)
            // TODO: use props dispatch
            // this.setState(updateLastLog(log))

            this.props.updateLog(log)
        } else {
            const log = inOut()

            this.props.addLog({
                ...log,
                _id: uid(),
                user_id: this.state.user._id,
            })
        }
    }

    render() {
        const { logs } = this.props
        const hasUnfinished = isUnfinished(logs)


        return (
            <div className="clock-holder">
                <Button onClick={this.click} clear large>
                    {
                        hasUnfinished ? (
                            <span className="flex">
                                { hasUnfinished ? 'Stop' : 'Start' }

                                <MdStop className="clock-toggle__icon clock-toggle__icon--stop" />

                                <DisplayDuration>{getLast(logs).check_in}</DisplayDuration>
                            </span>
                        ) : (
                            <span className="flex">
                                { hasUnfinished ? 'Stop' : 'Start' }

                                <MdPlay className="clock-toggle__icon clock-toggle__icon--start" />

                                0:00:00
                            </span>
                        )
                    }
                </Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        logs: selector(state),
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadLogs: () => dispatch(loadLogs()),
        addLog: (log) => dispatch(addLog(log)),
        updateLog: (log) => dispatch(updateLog(log)),
    }
}




export default connect(mapStateToProps, mapDispatchToProps)(Clock)
