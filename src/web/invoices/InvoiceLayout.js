import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ReactGridLayout from 'react-grid-layout'

import Card from '../shared/Card'
import InvoiceLayoutSlot from './InvoiceLayoutSlot'

const kaptura = 'kaptura'
const A4_RATIO = 1.4142

export default class InvoiceLayout extends PureComponent {
    static propTypes = {
        padding: PropTypes.number,
        hostWidth: PropTypes.number,
        onSlotSelect: PropTypes.func.isRequired,
        onSlotDelete: PropTypes.func.isRequired,
        onLayoutChange: PropTypes.func.isRequired,
    }

    render() {
        const { hostWidth, padding, onLayoutChange, layout, onSlotSelect, onSlotDelete } = this.props
        const height = Math.round(hostWidth * A4_RATIO)

        return (
            <Card>
                <div style={{ height: height + 'px' }}>
                    <ReactGridLayout
                        className="layout"
                        layout={layout}
                        cols={24}
                        rowHeight={height / 24}
                        width={hostWidth}
                        verticalCompact={false}
                        containerPadding={[padding, padding]}
                        margin={[0, 0]}
                        onLayoutChange={onLayoutChange}>

                        <InvoiceLayoutSlot key={'c'}
                            slot={{ name: 'Yo!', key: 'c', }}
                            onSelect={onSlotSelect}
                            onDelete={onSlotDelete}>
                            Yo!
                        </InvoiceLayoutSlot>

                        <div key={'b'}>b</div>
                        <div key={'a'}>c</div>
                        <div key={kaptura}><h4 className="text-center">Made With Kaptura</h4></div>
                    </ReactGridLayout>
                </div>
            </Card>
        )
    }
}
