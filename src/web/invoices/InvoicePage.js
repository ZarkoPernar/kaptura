import React, { Component } from 'react'
import { connect } from 'react-redux'

import appStore from '../appStore'
import Form from './Form'
import Card, { CardBody} from '../shared/Card'

import { storeItem } from './listReducer'

@connect(state => ({ company: state.companyInfo.data }))
export default class InvoicePage extends Component {
    update = (data) => {
        console.log(data);
        appStore.dispatch(storeItem.actions.update(data))
    }

    render() {
        return (
            <Card>
                <CardBody>
                    <Form invoice={this.props.invoice} onSubmit={this.update} />
                </CardBody>
            </Card>
        );
    }
}
