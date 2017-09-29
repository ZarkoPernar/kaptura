import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import MdPlay from 'react-icons/lib/md/play-arrow'
import MdStop from 'react-icons/lib/md/stop'
import { v4 as uid } from 'uuid'

import { actions as userInfoActions} from '../userInfo.reducer'
import Button from '../shared/Button'
import appTitle from '../shared/appTitle'

import { isUnfinished, getLast, inOut } from './clock'
import { selector, loadLogs, addLog, updateLog } from './reducer'
import DisplayDuration from './DisplayDuration'

import './clock.scss'

const DEFAULT_TITLE = 'Clock'

@connect((state) => ({
    logs: selector(state),
    user: state.userInfo && state.userInfo.user,
}), (dispatch) => {
    return {
        loadUser: () => dispatch(userInfoActions.load()),
        loadLogs: () => dispatch(loadLogs()),
        addLog: (log) => dispatch(addLog(log)),
        updateLog: (log) => dispatch(updateLog(log)),
    }
})
export default class Clock extends PureComponent {
    static defaultProps = {
        logs: [],
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
        this.props.loadUser()
    }

    refresh = () => {
        this.props.loadLogs()
    }

    click = () => {
        if (!this.props.user) return

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
                user_id: this.props.user._id,
            })
        }
    }

    render() {
        const { logs } = this.props
        const hasUnfinished = isUnfinished(logs)

        return (
            <Button onClick={this.click} clear>
                { hasUnfinished ? 'Stop' : 'Start' }
                {
                    (
                        hasUnfinished ?
                        <MdStop className="clock-toggle__icon clock-toggle__icon--stop" /> :
                        <MdPlay className="clock-toggle__icon clock-toggle__icon--start" />
                    )
                }

                {
                    (
                        hasUnfinished ?
                            <DisplayDuration>{getLast(logs).check_in}</DisplayDuration> :
                            '0:00:00'
                    )
                }
            </Button>
        )
    }
}
