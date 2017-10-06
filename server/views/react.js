"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const server_1 = require("react-dom/server");
const redux_1 = require("redux");
const redux_thunk_1 = require("redux-thunk");
const react_redux_1 = require("react-redux");
const reducers_1 = require("../../src/reducers");
const App_1 = require("../../src/App");
const middleware = redux_1.applyMiddleware(redux_thunk_1.default);
function handleRender(req, res) {
    // Create a new Redux store instance
    const store = redux_1.createStore(reducers_1.default, middleware);
    // Render the component to a string
    // const html = renderToString(
    //     React.createElement(Provider, { store, }, React.createElement(App))
    // )
    const html = server_1.renderToString(react_1.default.createElement(react_redux_1.Provider, { store, }, react_1.default.createElement(App_1.default)));
    // Grab the initial state from our Redux store
    const preloadedState = store.getState();
    // Send the rendered page back to the client
    res.send(renderFullPage(html, preloadedState));
}
exports.default = handleRender;
function renderFullPage(html, preloadedState) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title>Kaptura</title>
        <meta name="description" content="">
        <link href="https://fonts.googleapis.com/css?family=Exo|Overpass:300,400,500,600,700|Roboto+Slab" rel="stylesheet">

    </head>
    <body>

        <script>
            'use strict'
            window._googleLoaded = function() {}
        </script>

        <div id="app">${html}</div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        <script src="/public/bundle.js" async defer></script>

        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB2Vxg0KuWymrqutiyBdXcqEIOLm0GZf40&libraries=places&callback=_googleLoaded" async defer></script>
    </body>
    </html>
    `;
}
