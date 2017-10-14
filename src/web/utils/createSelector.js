import { createSelector as reselect } from 'reselect'

import { fromStore } from './store.utils'

export default function createSelector(storeName, rootStoreName) {
    if (rootStoreName === undefined) {
        return reselect(state => state[storeName], items => fromStore(items))
    }

    return reselect(
        state => state[rootStoreName],
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
