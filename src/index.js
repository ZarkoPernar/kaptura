import './index.css'

import { render } from 'react-dom'
import React from 'react'

let root

function init() {
    let App = require('./App').default
    root = render( < App /> , document.querySelector('#app'), root)
}

init()

if (module.hot) {
    module.hot.accept('./App', () => window.requestAnimationFrame(() => {
        init()
    }))
}
