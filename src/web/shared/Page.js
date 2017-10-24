import React from 'react'
import classnames from 'classnames'

import './page.scss'

export default function Page({ name, hasSubheader, children }) {
    return (
        <div className={classnames('page', name, {
            'page--has-subheader': hasSubheader,
        })}>
            { children }
        </div>
    )
}
