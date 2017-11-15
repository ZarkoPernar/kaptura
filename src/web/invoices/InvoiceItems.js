import React, { Component } from 'react';

import createStoreListComponent from '../shared/StoreList'
import { storeItem } from './itemsListReducer'
import { storeItem as rootStoreItem } from './itemsReducer'
import InvoiceItemsList from './InvoiceItemsList'

@createStoreListComponent({
    storeName: storeItem.name,
    actions: storeItem.actions,
    rootStoreItem
})
export default class InvoiceItems extends Component {
    constructor(props) {
        super(props)


        if (props.invoice !== undefined) {
            props.list({
                filters: {
                    invoice_id: {
                        comparator: '=',
                        value: props.invoice._id,
                    }
                }
            })
        }
    }

    render() {
        return (
            <div>
                <InvoiceItemsList items={this.props.items} />
            </div>
        )
    }
}
