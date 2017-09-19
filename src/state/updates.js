import NOOP from './NOOP'

export const UPDATE_NOTIFY = 'UPDATE_NOTIFY'
export const UPDATE_DISMISS = 'UPDATE_DISMISS'

export const UPDATE_STATE_INSTALLING = 'INSTALLING'
export const UPDATE_STATE_INSTALLED = 'INSTALLED'
export const UPDATE_STATE_REFRESH_NEEDED = 'REFRESH_NEEDED'
export const UPDATE_STATE_ERROR = 'ERROR'
export const UPDATE_STATE_OFFLINE = 'OFFLINE'

export function notifyUpdate(update_state) {
    return {
        type: UPDATE_NOTIFY,
        update_state,
    }
}

export function dismissUpdateNotification() {
    return {
        type: UPDATE_DISMISS,
    }
}

export default function updates(state = {
    state: 'installed', // installing | installed | refresh_needed | error | offline
    notifying: false,
}, action) {
    return ({
        [UPDATE_NOTIFY](state, { update_state }) {
            return {
                ...state,
                update_state,
                notifying: true,
                dismissable: [
                    UPDATE_STATE_INSTALLING,
                    UPDATE_STATE_INSTALLED,
                    UPDATE_STATE_ERROR,
                    UPDATE_STATE_OFFLINE,
                ].includes(update_state)
            }
        },
        [UPDATE_DISMISS](state) {
            return {
                ...state,
                notifying: state.dismissable ? false : state.notifying,
            }
        },
    }[action.type] || NOOP)(state, action)
}