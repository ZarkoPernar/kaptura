import React, { Component } from 'react'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import Range from '../shared/form/Range'
import FormGroup from '../shared/form/FormGroup'
import MeasureDimensions from '../shared/MeasureDimensions'

import InvoiceLayout from './InvoiceLayout'

import './a4.scss'

const DEFAULT_LAYOUT = [
    { i: 'a', x: 0, y: 0, w: 1, h: 2 },
    { i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
    { i: 'c', x: 4, y: 0, w: 1, h: 2 },
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
            <div className="page page--padding">
                <div className="page__controls">
                    <FormGroup label={'Padding: ' + this.state.padding}>
                        <Range name="padding" onChange={this.padChange} value={this.state.padding} />
                    </FormGroup>
                </div>
                <MeasureDimensions>
                    <InvoiceLayout
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
