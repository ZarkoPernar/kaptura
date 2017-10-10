import React, { Component } from 'react'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import Range from '../shared/form/Range'
import FormGroup from '../shared/form/FormGroup'
import MeasureDimensions from '../shared/MeasureDimensions'

import InvoiceLayout from './InvoiceLayout'

import './a4.scss'

const DEFAULT_LAYOUT = [
    { i: 'company', x: 0, y: 0, w: 1, h: 2 },
    { i: 'client', x: 1, y: 0, w: 3, h: 2, },
    { i: 'issued_by', x: 4, y: 0, w: 1, h: 2 },

    // footer copy
    { i: 'kaptura', x: 4, y: 23, w: 4, h: 1, static: true },
];

export default class InvoicePage extends Component {
    state = {
        padding: 0,
        layout: DEFAULT_LAYOUT,
    }
    constructor(props) {
        super(props)
        const stuff = JSON.parse(window.localStorage.getItem('layout-v1'))
        if (stuff) {
            this.state.padding = stuff.padding
            this.state.layout = stuff.layout
        }

        if (props.invoice) {
            this.state.slots = [
                {
                    key: 'client',
                    name: 'client',
                    content: (
                        <div>
                            <h3>{props.invoice.client.name}</h3>
                            <p>{props.invoice.client.google_address}</p>
                            <p>OIB: {props.invoice.client.company_number}</p>
                        </div>
                    )
                }, {
                    key: 'company',
                    name: 'company',
                    content: (
                        <div>
                            <h3>{props.invoice.company.name}</h3>
                            <p>{props.invoice.company.google_address}</p>
                        </div>
                    )
                }, {
                    key: 'invoice_number',
                    name: 'invoice_number',
                    content: <h2>Racun br. {props.invoice.number || ''}</h2>
                }, {
                    key: 'due_date',
                    name: 'due_date',
                    content: <h3>Rok placanja: {props.invoice.due_date || ''}</h3>
                }, {
                    key: 'issue_date_place',
                    name: 'issue_date_place',
                    content: <p>{props.invoice.issue_place || ''} {props.invoice.issue_date || ''}</p>
                }, {
                    key: 'payment_type',
                    name: 'payment_type',
                    content: <h3>Nacin placanja: {props.invoice.payment_type || ''}</h3>
                }, {
                    key: 'payment_information',
                    name: 'payment_information',
                    content: <h3>Informacije: {props.invoice.payment_information || ''}</h3>
                }, {
                    key: 'terms',
                    name: 'terms',
                    content: <h3>Uvjeti: {props.invoice.terms || ''}</h3>
                }
            ]
        }
    }

    padChange = (value) => {
        this.setState({padding: value})
    }

    onLayoutChange = (layout) => {
        // this will not work with async get
        // since ReactGridLayout calls onLayoutChange after init
        // so if we init with some layout it will be called with that
        // and saved to localstorage
        // TODO: initialize ReactGridLayout with DEFAULT_LAYOUT only after we check the
        // server or storage for stored layouts
        window.localStorage.setItem('layout-v1', JSON.stringify({padding: this.state.padding, layout}))
    }

    onSlotSelect = (slot) => {
        alert('select ' + slot.name);
    }

    onSlotDelete = (slot) => {
        alert('delete ' + slot.name);
    }

    render() {
        return (
            <div className="page">
                <div className="page__controls">
                    <FormGroup label={'Padding: ' + this.state.padding}>
                        <Range name="padding" onChange={this.padChange} value={this.state.padding} />
                    </FormGroup>
                </div>
                <MeasureDimensions>
                    <InvoiceLayout
                        slots={this.state.slots}
                        onSlotSelect={this.onSlotSelect}
                        onSlotDelete={this.onSlotDelete}
                        padding={this.state.padding}
                        onLayoutChange={this.onLayoutChange}
                        layout={this.state.layout} />
                </MeasureDimensions>
            </div>
        );
    }
}
