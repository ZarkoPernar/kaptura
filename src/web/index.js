import React from 'react'
import { render } from 'react-dom'
import 'rxjs'

import App from './App'

let root


import './index.css'
// if (process.env.NODE_ENV !== 'production') {
//   const {whyDidYouUpdate} = require('why-did-you-update')
//   whyDidYouUpdate(React)
// }


function init() {
    root = render( < App /> , document.querySelector('#app'), root)
}



// if ('production' !== process.env.NODE_ENV) {
//     window.addEventListener('message', e => {
//         console.clear()
//     })
// }

init()

if (module.hot) {
    module.hot.accept('./App', () => window.requestAnimationFrame(() => {
        init()
    }))
}
