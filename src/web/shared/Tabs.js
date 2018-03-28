import React, { Component } from 'react'
import classnames from 'classnames'

import Button from './Button'

import './tabs.scss'

export const Tab = ({ children, onClick, isActive, disabled }) => (
    <div
        className={classnames('tabs__controls__item', {
            'tabs__controls__item--is-active': isActive === true,
        })}
    >
        <Button clear full onClick={onClick} disabled={disabled}>
            {children}
        </Button>
    </div>
)

export class Tabs extends Component {
    render() {
        return (
            <div className="tabs">
                <div
                    className={
                        'tabs__controls' +
                        (this.props.hasLinks ? ' tabs__controls--links' : '')
                    }
                >
                    {this.props.children}
                </div>
            </div>
        )
    }
}
