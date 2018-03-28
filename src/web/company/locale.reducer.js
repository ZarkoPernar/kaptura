const localeInitialState = {
    lang: 'hr',
}

const SET_LOCALE_LANG = 'SET_LOCALE_LANG'

const localeReducer = (state = localeInitialState, action) => {
    switch (action.type) {
        case SET_LOCALE_LANG:
            return {
                ...state,
                lang: action.lang,
            }

        default:
            return state
    }
}

export default localeReducer
