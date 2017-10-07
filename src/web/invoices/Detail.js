import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Page from '../shared/Page'
import PageBody from '../shared/PageBody'

class InvoiceDetail extends Component {
    render() {
        return (
            <Page>
                <PageBody>
                    <h1>Hello</h1>
                    {this.props.location.state.invoice._id}
                </PageBody>
            </Page>
        )
    }
}

InvoiceDetail.propTypes = {

};

export default InvoiceDetail;
