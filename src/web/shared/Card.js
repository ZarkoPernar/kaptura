import React from 'react'
import classnames from 'classnames'

import './card.scss'

export const CardBody = ({ children }) => (
    <div className="card__body">
        {children}
    </div>
)

export default ({ children, className }) => (
    <div className={classnames("card", className)}>
        {children}
    </div>
)
