import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { Tabs, Tab } from '../shared/Tabs'

export default class ProjectTabs extends Component {
    static propTypes = {
        activeTab: PropTypes.string.isRequired,
        selectTab: PropTypes.func.isRequired,
    }

    selectListTab = () => {
        this.props.selectTab('List')
    }

    selectMapTab = () => {
        this.props.selectTab('Map')
    }

    selectCalendarTab = () => {
        this.props.selectTab('Calendar')
    }

    render() {
        return (
            <Tabs>
                <Tab onClick={this.selectListTab} isActive={this.props.activeTab === 'List'}>
                    <Link to="/projekti">
                        Lista
                    </Link>
                </Tab>
                <Tab onClick={this.selectCalendarTab} isActive={this.props.activeTab === 'Calendar'}>
                    <Link to="/projekti/kalendar">
                        Kalendar
                    </Link>
                </Tab>
                <Tab onClick={this.selectMapTab} isActive={this.props.activeTab === 'Map'}>
                    <Link to="/projekti/karta">
                        Karta
                    </Link>
                </Tab>
            </Tabs>
        )
    }
}

