import DefaultState from '../DefaultState'

export const REMOVE_TOAST = 'REMOVE_TOAST'

export function toastsReducer(state=DefaultState.toasts, {type, payload}) {
    switch(type) {
        case 'ADD_TOAST':
            return state.concat([payload])
        case 'ADD_ITEM':
            return [...state, {
                duration: 3000,
                description: 'You have successufully added a new location!',
            }]
        
        case REMOVE_TOAST:
            return state.filter(toast => toast.id !== payload.id)
        case 'DISMISS_TOAST':
            return state.map((tst) => {
                if (tst === payload) {
                    return Object.assign({}, tst, {
                        closed: true
                    })
                }
                return tst
            })
        default:
            return state
    }
}