import React, { Component } from 'react'
import MdChat from 'react-icons/lib/md/chat'
import MdNotifications from 'react-icons/lib/md/notifications'
import MdMenu from 'react-icons/lib/md/menu'

import Clock from './clock'
import Button from './shared/Button'

import './AppHeader.scss'

export default class AppHeader extends Component {

    toggle = (event) => {
        event.stopPropagation()

        this.props.sidenavInstance.toggle()
    }

    openChat = () => {

    }

    openNotifications = () => {

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
                        <Button clear iconOnly large onClick={this.toggle}>
                            <MdMenu />
                        </Button>
                    </span>

                    <Clock />

                    {/* <div className="flex">
                        <Button style={{marginRight: '1rem'}} large clear iconOnly onClick={this.openNotifications}>
                            <MdNotifications />
                        </Button>
                        <Button large clear iconOnly onClick={this.openChat}>
                            <MdChat />
                        </Button>
                    </div> */}

                </div>
            </header>
        )
    }
}
