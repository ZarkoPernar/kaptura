import React, { PureComponent } from 'react';
import classnames from 'classnames'

class InputWrapper extends PureComponent {
    render() {
        return (
            <div className={classnames('form-group', {
                'form-group--active': this.props.hasValue || this.props.hasFocus,
                'form-group--has-error': this.props.error,
            })}>

                {this.props.children}

                <label htmlFor={this.props.id}>{this.props.label}</label>
                <div className="form-group__line" />
            </div>
        )
    }
}

export default InputWrapper;
