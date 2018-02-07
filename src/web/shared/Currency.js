import React from 'react'
import PropTypes from 'prop-types'
import currencyJS from 'currency.js'

const style = {
    letterSpacing: '1px',
}
const Currency = ({ currency, children }) => {
    return (
        <span style={style}>
            {typeof currency !== 'object'
                ? children
                : currencyJS(children, {
                      separator: currency.separator,
                      decimal: currency.decimal,
                      symbol: currency.symbol,
                      formatWithSymbol: true,
                  }).format()}
        </span>
    )
}

Currency.propTypes = {}

export default Currency
