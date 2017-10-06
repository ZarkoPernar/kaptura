import React, { Component } from 'react'
import classnames from 'classnames'
import 'flexboxgrid'

import './flex.scss'

export default ({ className, children }) => (
    <div className={classnames('flex', className)}>
        { children }
    </div>
)


