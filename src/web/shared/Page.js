import React from 'react'
import classnames from 'classnames'

import './page.scss'
import PageSubheader from './PageSubheader'

export default function Page({ name, children }) {
    let hasSubheader = false
    React.Children.forEach(children, child => {
        if (child.type === PageSubheader) {
            hasSubheader = true
        }
    })
    return (
        <div className={classnames('page', name, {
            'page--has-subheader': hasSubheader,
        })}>
            { children }
        </div>
    )
}
