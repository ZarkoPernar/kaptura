import React, { Component } from 'react';
import PropTypes from 'prop-types'
import MdBuild from 'react-icons/lib/md/build'

import Button from '../shared/Button'

const ils__inner = {
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 2,
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
                    <Button clear iconOnly small onClick={this.onSelect}>
                        <MdBuild />
                    </Button>
                </div>
                {this.props.children}
            </div>
        );
    }
}

export default InvoiceLayoutSlot;
