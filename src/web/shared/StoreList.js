import { connect } from 'react-redux'

import createSelector from '../utils/createSelector'

export default function createStoreListComponent({ storeName, actions, rootStoreItem }) {
    const selector = createSelector(storeName, rootStoreItem && rootStoreItem.name)

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
