import React from 'react'
import { render } from 'react-dom'
import 'rxjs'

import RootCmp from './Root'

let root


import './index.css'
// if (process.env.NODE_ENV !== 'production') {
//   const {whyDidYouUpdate} = require('why-did-you-update')
//   whyDidYouUpdate(React)
// }


function init() {
    root = render( <RootCmp /> , document.querySelector('#app'), root)
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
