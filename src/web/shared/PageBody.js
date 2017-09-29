import React from 'react'
import classnames from 'classnames'

import './page.scss'

export default function PageBody({ children }) {
    return (
        <div className="page__body">
            { children }
        </div>
    )
}
