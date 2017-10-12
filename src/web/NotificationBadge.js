import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Badge from './shared/Badge'


export const NotificationBadge = props => {
    return <Badge color="danger">{props.count === 0 ? '' : props.count}</Badge>
}

NotificationBadge.propTypes = {
    count: PropTypes.number.isRequired,
}

export default connect(state => ({
    count: state.notifications.allIds ? state.notifications.allIds.length : 0
}))(NotificationBadge)
