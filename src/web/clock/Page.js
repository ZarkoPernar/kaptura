import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Sidebar from '../shared/Sidebar'
import Page from '../shared/Page'
import PageBody from '../shared/PageBody'
import PageSubheader from '../shared/PageSubheader'
import Pagination from '../shared/Pagination'
import Toaster from '../shared/toast/Toaster'
import createStoreListComponent from '../shared/StoreList'
import { selector as employeesSelector } from '../employees/reducer'

import LogPropType from './LogPropType'
import TimesheetPageFilters from './TimesheetPageFilters'
import TimesheetList from './TimesheetList'
import TimesheetDispatcher from './TimesheetDispatcher'
import EditTimesheetForm from './EditTimesheetForm'
import { storeItem } from './timesheetListReducer'
import { storeItem as rootStoreItem } from './reducer'

import './timesheet.scss'

/**
 * Timesheet Page component displays a list of timesheet logs,
 * renders available filters for querying, and exposes the edit form in a sidebar.
 *
 * @export
 * @class TimesheetPage
 * @extends {Component}
 */
export class TimesheetPage extends Component {
    static propTypes = {
        timesheets: PropTypes.arrayOf(
            PropTypes.shape({
                _id: PropTypes.string.isRequired,
                user_id: PropTypes.string.isRequired,
                project_id: PropTypes.string,
                check_in: PropTypes.string.isRequired,
                check_out: PropTypes.string,
                project_name: PropTypes.string,
                client_name: PropTypes.string,
            }),
        ),

        /**
         * Raw redux store data with company employees.
         * It is used on a join operation in the TimesheetList component
         */
        employees: PropTypes.shape({
            byId: PropTypes.objectOf(
                PropTypes.shape({
                    _id: PropTypes.string.isRequired,
                    name: PropTypes.string.isRequired,
                }),
            ),
        }),

        /** Indicates if the fetch list has failed */
        // hasError: PropTypes.bool.isRequired,

        /** Indicates if the fetch list is in progress */
        // isLoading: PropTypes.bool.isRequired,

        /** Indicates if an update on one of the items in the list is in progress */
        // isUpdating: PropTypes.bool.isRequired,
    }

    static defaultProps = {
        timesheets: [],
        employees: {
            byId: {},
        },
        update: () => {},
    }

    state = {
        /** Is pased to the EditTimesheetForm */
        selectedTimesheet: null,

        /** When selectedTimesheet is set the TimesheetDispatcher component dispatches an update action */
        timesheetForUpdate: null,

        /** Used when querying api/timesheet/list as paramater */
        filters: {},

        /** Used when querying api/timesheet/list as paramater */
        pages: {},
    }

    onFilterChange = filters => {
        this.setState({
            filters,
        })
    }

    onPageChange = currentPage => {
        this.setState({
            pages: {
                pageNumber: currentPage,
            },
        })
    }

    selectTimesheet = log => {
        this.setState({
            selectedTimesheet: log,
            isSidebarOpen: true,
        })
    }

    onRequestClose = () => {
        this.setState({
            selectedTimesheet: null,
            isSidebarOpen: false,
        })
    }

    /**
     * Set timesheet to update, close modal, publish a toast with a success message.
     *
     * @param {object} timesheet
     */
    updateLog = timesheet => {
        this.setState({
            toasts: [
                {
                    duration: 3000,
                    // TODO: intl
                    message: 'You have sucessufully updated the timesheet',
                    color: 'success',
                },
            ],
            timesheetForUpdate: timesheet,
            selectedTimesheet: null,
            isSidebarOpen: false,
        })
    }

    render() {
        return (
            <Page name="timesheet" hasSubheader>
                <Toaster toasts={this.state.toasts} />

                <TimesheetDispatcher
                    filters={this.state.filters}
                    pages={this.state.pages}
                    updateItem={this.state.timesheetForUpdate}
                />

                <Sidebar
                    isOpen={this.state.isSidebarOpen}
                    onRequestClose={this.onRequestClose}
                >
                    <EditTimesheetForm
                        selectedTimesheet={this.state.selectedTimesheet}
                        onSubmit={this.updateLog}
                        onDismiss={this.onRequestClose}
                    />
                </Sidebar>

                <PageSubheader>
                    <TimesheetPageFilters
                        filters={this.state.filters}
                        onFilterChange={this.onFilterChange}
                    />
                </PageSubheader>

                <PageBody>
                    <TimesheetList
                        onSelect={this.selectTimesheet}
                        timesheets={this.props.timesheets}
                        employees={this.props.employees}
                        hasError={this.props.hasError}
                        isLoading={this.props.isLoading}
                        isUpdating={this.props.isUpdating}
                    />
                    <Pagination onChange={this.onPageChange} />
                </PageBody>
            </Page>
        )
    }
}

const stateToProps = state => ({
    locale: state.locale,
    employees: employeesSelector(state),
    timesheets: storeItem.listDataSelector(state),
    hasError: storeItem.selector(state).error,
    isLoading: storeItem.selector(state).loading,
    isUpdating: storeItem.selector(state).updating,
})

export default connect(stateToProps, storeItem.actions)(TimesheetPage)
