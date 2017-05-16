import React, { Component } from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames'

const DEFAULT_POSITION = 'translate3d(0, -105%, 0)'

class TableRowOverlayComponent extends Component {
    static propTypes = {
        active: PropTypes.bool,
        offsetTop: PropTypes.number,
    }

    render() {
        return (
            <div className={classnames('table-row-overlay', {'table-row-overlay--active': this.props.active})}
                style={{transform: getTop(this.props.offsetTop)}}>
                {this.props.children}
            </div>
        )
    }
}

export default TableRowOverlayComponent

function getTop(offsetTop) {
    if (offsetTop === undefined) return DEFAULT_POSITION

    return `translate3d(0, ${offsetTop}px, 0)`
}
