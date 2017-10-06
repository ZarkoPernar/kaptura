import React, { Component } from 'react'

import Page from '../shared/Page'
import PageBody from '../shared/PageBody'
import CompanyInfo from '../company/CompanyInfo'


export default class TvrtkaPage extends Component {
    render() {
        return (
            <Page>
                <PageBody>
                    <CompanyInfo company={this.props.company} />
                </PageBody>
            </Page>
        )
    }
}
