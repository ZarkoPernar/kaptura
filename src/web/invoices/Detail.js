import React, { Component } from 'react';
import PropTypes from 'prop-types';

import api from './api'
import Page from '../shared/Page'
import PageBody from '../shared/PageBody'
import InvoicePage from './InvoicePage'

class InvoiceDetail extends Component {
    state = {}

    constructor(props) {
        super(props)
        console.log(props)

        if (props.location.state !== undefined) {
            this.state.invoice = props.location.state.invoice
        } else {
            // TODO: load invoice async
            api.getById(props.match.params.itemId)
                .then((res) => {
                    this.setState({
                        invoice: res,
                    })
                })
        }
    }

    render() {
        return (
            <Page>
                <PageBody>
                    {
                        this.state.invoice ? <InvoicePage invoice={this.state.invoice} /> : 'Loading...'
                    }
                </PageBody>
            </Page>
        )
    }
}

InvoiceDetail.propTypes = {

};

export default InvoiceDetail;
