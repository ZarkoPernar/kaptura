import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Head from './Head'
import Foot from './Foot'
import Row from './Row'

class Transactions extends Component {
    render() {
        return (
            <div>
                <table key="table" className="table">
                    <Head key="head" />

                    <tbody key="body">
                        {
                            this.props.projects.map((ts, i) => (
                                <Row key={ts._id} index={i + 1} project={ts} click={this.props.rowClick} />
                            ))
                        }
                    </tbody>

                    <Foot />

                </table>

                {/*<div key="bottom">
                    <div key="currency">
                        <strong>
                            List of converted currencies:
                        </strong>
                    </div>
                    <div key="amount">
                        {
                            unique(
                                this.props.transactions.map(ts => ts.currency)
                            ).join(', ')
                        }
                    </div>
                </div>*/}
            </div>
        )
    }
}

Transactions.propTypes = {
    currency: PropTypes.string,
    rates: PropTypes.object,
    transactions: PropTypes.arrayOf(
        PropTypes.shape({
            currency: PropTypes.string,
            amount: PropTypes.number
        })
    )
}

export default Transactions
