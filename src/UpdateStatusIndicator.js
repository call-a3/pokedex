import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {
  dismissUpdateNotification,
  UPDATE_STATE_INSTALLING,
  UPDATE_STATE_INSTALLED,
  UPDATE_STATE_REFRESH_NEEDED,
  UPDATE_STATE_ERROR,
  UPDATE_STATE_OFFLINE,
} from './state/updates'

import './UpdateStatusIndicator.css'

function UpdateStatusIndicator({ notifying, dismissable, update_state, dismissUpdateNotification }) {
    return notifying &&
      <aside
        className="UpdateStatusIndicator"
        onClick={dismissable && dismissUpdateNotification || (() => window.location.reload())}
      >
        <span className="UpdateStatusIndicator-label">{({
          [UPDATE_STATE_INSTALLING]: 'Content is being prefetched',
          [UPDATE_STATE_INSTALLED]: 'Content is cached for offline use.',
          [UPDATE_STATE_REFRESH_NEEDED]: 'New content is available. Please refresh.',
          [UPDATE_STATE_ERROR]: 'Something went wrong :(',
          [UPDATE_STATE_OFFLINE]: 'Offline mode is active.',
          })[update_state]}
        </span>
        <span className="UpdateStatusIndicator-action">{
          dismissable && '🗙' || '↻'
        }</span>
      </aside>
}

export default connect(
  state => state.updates,
  dispatch => bindActionCreators({ dismissUpdateNotification }, dispatch)
)(UpdateStatusIndicator)