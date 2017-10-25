import React, { Component } from 'react'
import { connect } from 'react-redux'

import appStore from '../appStore'
import Form from './Form'
import Card, { CardBody} from '../shared/Card'
import Flex from '../shared/flex'
import Cell from '../shared/Cell'

import { storeItem } from './listReducer'

import './invoice-page.scss'

@connect(state => ({ company: state.companyInfo.data }))
export default class InvoicePage extends Component {
    update = (data) => {
        console.log(data);
        appStore.dispatch(storeItem.actions.update(data))
    }

    render() {
        return (
            <Flex grid>
                <Cell md="2">
                    <aside className="invoice-page__side">
                        <h3 className="invoice-page__side__title">Osnovne Informacije</h3>
                    </aside>
                </Cell>
                <Cell md="10">
                    <Card>
                        <CardBody>
                            <Form invoice={this.props.invoice} onSubmit={this.update} onChange={this.update} />
                        </CardBody>
                    </Card>
                </Cell>

                <Cell md="2">
                    <aside className="invoice-page__side">
                        <h3 className="invoice-page__side__title">Stavke</h3>
                    </aside>
                </Cell>
                <Cell md="10">
                    <Card>
                        <CardBody>

                        </CardBody>
                    </Card>
                </Cell>
            </Flex>
        );
    }
}
