import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { v4 as uid } from 'uuid'

import { actions as userInfoActions } from '../userInfo.reducer'
import appTitle from '../shared/appTitle'
import createStoreListComponent from '../shared/StoreList'

import { isUnfinished, getLast, inOut } from './clock'
import { storeItem } from './reducer'
import { storeItem as listStoreItem } from './timesheetListReducer'
import { storeItem as rootStoreItem } from '../timesheet/reducer'

import ClockButton from './ClockButton'

import './clock.scss'

const DEFAULT_TITLE = 'Clock'

@connect(
    state => ({
        user: state.userInfo && state.userInfo.user,
    }),
    {
        loadUser: userInfoActions.load,
        sendToList: ({ payload }) => ({
            type: listStoreItem.types.ADD_ITEM,
            payload,
        }),
    },
)
@createStoreListComponent({
    storeName: 'clock',
    actions: storeItem.actions,
    rootStoreItem,
})
export default class Clock extends PureComponent {
    static defaultProps = {
        items: [],
    }

    _activeLog = null
    _hasUnfinished = false

    constructor(props) {
        super(props)

        if (props.items && props.items !== this.props.items) {
            this._activeLog = getLast(props.items)
            this._hasUnfinished = isUnfinished(props.items)
        }
    }

    componentDidMount() {
        this.getUser()
        this.appTitle = appTitle(window.document)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user && nextProps.user !== this.props.user) {
            this.getLogs(nextProps.user)
        }

        if (nextProps.items && nextProps.items !== this.props.items) {
            this._activeLog = getLast(nextProps.items)
            this._hasUnfinished = isUnfinished(nextProps.items)
        }
    }

    getUser = () => {
        this.props.loadUser()
    }

    getLogs = user => {
        this.props.list({
            filters: {
                user_id: {
                    comparator: '=',
                    value: user._id,
                },
            },
            pages: {
                pageSize: 1,
            },
        })
    }

    onToggle = () => {
        if (!this.props.user) return

        if (isUnfinished(this.props.items)) {
            const log = inOut(getLast(this.props.items))

            this.appTitle.setTitle(DEFAULT_TITLE)
            // TODO: use props dispatch
            // this.setState(updateLastLog(log))

            this.props.update(log)
        } else {
            const log = inOut()

            this.props
                .add({
                    ...log,
                    _id: uid(),
                    user_id: this.props.user._id,
                })
                .then(this.props.sendToList)
        }
    }

    render() {
        return (
            <ClockButton
                onToggle={this.onToggle}
                activeLog={this._activeLog}
                isActive={this._hasUnfinished}
            />
        )
    }
}
