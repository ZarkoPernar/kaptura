import React, { Component } from 'react'
import classnames from 'classnames'
import 'flexboxgrid'

import './flex.scss'

export default ({ className, children, grid }) => (
    <div className={classnames('row', className)}>
        { children }
    </div>
)


