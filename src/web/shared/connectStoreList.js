import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// TODO: add this to redux-store-list
export function connectStoreList({ name, actionCreators, selector }) {
    const stateToProps = state => ({
        listData: selector(state),
        // TODO:
        // create a full data selector in redux-store-list
        // to access following props in the store

        // listError: state[name].error,
        // isLoading: state[name].isLoading,
        // isUpdating: state[name].isUpdating
    })

    return function(target) {
        return connect(stateToProps, {
            loadList: actionCreators.loadList,
            addListItem: actionCreators.add,
            updateListItem: actionCreators.update,
            removeListItem: actionCreators.remove,
        })(target)
    }
}
