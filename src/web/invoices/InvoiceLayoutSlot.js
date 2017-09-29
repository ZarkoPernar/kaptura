import React, { Component } from 'react';
import PropTypes from 'prop-types'

const ils__inner = {
    width: '100%',
    height: '100%',
}
class InvoiceLayoutSlot extends Component {
    static propTypes = {
        onSelect: PropTypes.func.isRequired,
        onDelete: PropTypes.func.isRequired,
        slot: PropTypes.shape({
            key: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        })
    }

    onSelect = () => {
        this.props.onSelect(this.props.slot)
    }

    onDelete = () => {
        this.props.onDelete(this.props.slot)
    }

    render() {
        const { children, slot, onSelect, onDelete, ...rest } = this.props
        return (
            <div {...rest}>
                <div style={ils__inner}>
                    <button onClick={this.onSelect}>Use this slot</button>
                    <button onClick={this.onDelete}>Delete this slot</button>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default InvoiceLayoutSlot;
