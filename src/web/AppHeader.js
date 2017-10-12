import React, { Component } from 'react'
import MdChat from 'react-icons/lib/md/chat'
import MdNotifications from 'react-icons/lib/md/notifications'
import MdMenu from 'react-icons/lib/md/menu'

import Clock from './clock'
import Button from './shared/Button'
import NotificationBadge from './NotificationBadge'

import './AppHeader.scss'

export default class AppHeader extends Component {
    componentDidMount() {
        document.body.addEventListener('click', this.close)
        if (this._btn) {
            this._btn.addEventListener('click', this.toggle)
        }
    }

    componentWillUnmount() {
        document.body.removeEventListener('click', this.close)
        if (this._btn) {
            this._btn.removeEventListener('click', this.toggle)
        }
    }

    getBtnRef = (ref) => {
        this._btn = ref
    }

    close = () => {
        document.body.classList.remove('App--menuIsOpen')
    }

    toggle = (event) => {
        event.stopPropagation()
        document.body.classList.toggle('App--menuIsOpen')
    }

    render() {
        return (
            <header role="banner" className="App-heading">
                <div className="App-logo">
                    <h2 className="App-logo__text">
                        Kaptura
                    </h2>
                </div>

                <div className="App-heading__inner">
                    <span className="App-heading__menu-btn">
                        <button className="btn btn--clear btn--icon-only btn--large" ref={this.getBtnRef}>
                            <MdMenu />
                        </button>
                    </span>

                    <Clock />

                    <div className="flex">
                        <Button large clear iconOnly onClick={this.props.toggleChat}>
                            <NotificationBadge />
                            <MdChat />
                        </Button>
                    </div>

                </div>
            </header>
        )
    }
}
