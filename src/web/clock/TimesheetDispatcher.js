import React, { Component } from 'react'
import PropTypes from 'prop-types'

import createStoreListComponent from '../shared/StoreList'
import { storeItem } from './timesheetListReducer'
import { storeItem as rootStoreItem } from './reducer'

class TimesheetDispatcher extends Component {
    static propTypes = {
        filters: PropTypes.object.isRequired,
        pages: PropTypes.object.isRequired,
    }

    componentDidMount() {
        this.props.list({
            pages: this.props.pages,
            filters: this.props.filters,
        })
    }

    componentWillReceiveProps(nextProps) {
        if (
            nextProps.filters !== this.props.filters ||
            nextProps.pages !== this.props.pages
        ) {
            this.props.list({
                pages: nextProps.pages,
                filters: nextProps.filters,
            })
        }

        if (
            nextProps.updateItem &&
            nextProps.updateItem !== this.props.updateItem
        ) {
            this.props.update(nextProps.updateItem)
        }
    }

    render() {
        return <div />
    }
}

export default createStoreListComponent({
    storeName: 'timesheetList',
    actions: storeItem.actions,
    rootStoreItem,
})(TimesheetDispatcher)
