import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import { fromStore } from '../utils/store.utils'

export default function createStoreListComponent({ storeName, actions, rootStoreItem }) {
    let selector

    if (!rootStoreItem) {
        selector = createSelector(state => state[storeName], items => fromStore(items))
    } else {
        selector = createSelector(
            state => state[rootStoreItem.name],
            state => state[storeName],
            // combine
            (root, items) => {
                const byId = root.byId
                const allIds = items.allIds

                return fromStore({
                    allIds,
                    byId,
                })
            }
        )
    }

    const stateToProps = state => ({
        items: selector(state),
        error: state[storeName].error,
        loading: state[storeName].loading,
        updating: state[storeName].updating
    })

    return function (target) {
        return connect(stateToProps, actions)(target)
    }
}
