import React from 'react'
import classnames from 'classnames'

export default function Box({ style, padding, children}) {
    return (
        <div style={style} className={classnames({
            'box--padding': padding,
        })}>
            {children}
        </div>
    )
}
