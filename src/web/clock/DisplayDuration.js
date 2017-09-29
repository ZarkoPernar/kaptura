import React, { PureComponent } from 'react'

import { timeSinceNow } from './formatTime'
import appTitle from '../shared/appTitle'

const DEFAULT_TITLE = ' - Clock'

export default class DisplayDuration extends PureComponent {
    state = {
        time: new Date().toISOString(),
    }

    componentWillMount() {
        this.interval = setInterval(this.update, 1000)
    }

    componentDidMount() {
        this.appTitle = appTitle(window.document)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    update = () => {
        this.setState({
            time: new Date().toISOString(),
        })
    }

    render() {
        const time = timeSinceNow(this.props.children)

        if (this.appTitle !== undefined) {
            this.appTitle.setTitle(time + DEFAULT_TITLE)
        }

        return <span>{ time }</span>
    }
}
