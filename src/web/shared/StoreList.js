import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import { fromStore } from '../utils/store.utils'

export default function createStoreItemComponent({ storeName, actions }) {
    const selector = createSelector(state => state[storeName], items => fromStore(items))
    const stp = state => ({
        items: selector(state)
    })

    return function (target) {
        return connect(stp, actions)(target)
    }
}
