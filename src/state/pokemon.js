import NOOP from './NOOP'

export const MARK_CAUGHT = 'MARK_CAUGHT'
export const MARK_UNCAUGHT = 'MARK_UNCAUGHT'
export const RESET_ALL = 'RESET_ALL'

export function markCaught(number) {
    return {
        type: MARK_CAUGHT,
        number,
    }
}

export function markUncaught(number) {
    return {
        type: MARK_UNCAUGHT,
        number,
    }
}

export function resetAll() {
    return {
        type: RESET_ALL,
    }
}

export default function pokemon(state = {}, action) {
    return ({
        [MARK_CAUGHT](state, { number }) {
            return Object.assign({}, state, {
                ...state,
                [number]: true,
            })
        },
        [MARK_UNCAUGHT](state, { number }) {
            return Object.assign({}, state, {
                ...state,
                [number]: false,
            })
        },
        [RESET_ALL](state, { number }) {
            return {}
        },
    }[action.type] || NOOP)(state, action)
}