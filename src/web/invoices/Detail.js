import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {  } from 'react-router-dom';

import Page from '../shared/Page'
import PageBody from '../shared/PageBody'
import InvoicePage from './InvoicePage'

class InvoiceDetail extends Component {
    render() {
        return (
            <Page>
                <PageBody>
                    <InvoicePage invoice={this.props.location.state.invoice} />
                </PageBody>
            </Page>
        )
    }
}

InvoiceDetail.propTypes = {

};

export default InvoiceDetail;
