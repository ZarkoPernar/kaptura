import React, { PureComponent } from 'react';

export default class Event extends PureComponent {
    render() {
        const { event, title } = this.props

        return (
            <div>
                {title}
            </div>
        );
    }
}
