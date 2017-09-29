import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import BigCalendar from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'

import Event from './Event'
import localization from './localization'
import './calendar.scss'

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
)

const hasStart = (item) => (item.start_date !== undefined)
const toEvent = (item) => ({
    ...item,
    start_date: new Date(Date.parse(item.start_date)),
    end_date: item.end_date ? new Date(Date.parse(item.end_date)) : new Date(Date.parse(item.start_date))
})

const components = {
    event: Event
}

const DragAndDropBigCalendar = withDragAndDrop(BigCalendar);

@DragDropContext(HTML5Backend)
export default class Calendar extends PureComponent {
    // static propTypes = {
    //     items: PropTypes.arrayOf(PropTypes.shape({
    //         start_date: PropTypes.string.isRequired,
    //         end_date: PropTypes.string,
    //     }))
    // }

    static defaultProps = {
        items: [],
    }

    constructor(props) {
        super(props)

        this.state = {
            events: props.items.filter(hasStart).map(toEvent),
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.items !== this.props.items) {
            this.setState({ events: nextProps.items.filter(hasStart).map(toEvent) })
        }
    }

    onSelectSlot = ({ start, end, slots, action, }) => {
        console.log({ start, end, slots, action, });

    }

    moveEvent = ({ event, start, end }) => {
        const events = this.state.events
        const idx = events.indexOf(event)
        const updatedEvent = { ...event, start_date: start, end_date: end }
        const nextEvents = [...events]

        nextEvents.splice(idx, 1, updatedEvent)

        this.setState({
            events: nextEvents
        })

        if (this.props.onEventChange) {
            this.props.onEventChange({
                ...updatedEvent,
                start_date: updatedEvent.start_date.toISOString(),
                end_date: updatedEvent.end_date.toISOString(),
            })
        }
    }


    render() {
        return (
            <div style={{height: '700px'}}>
                <DragAndDropBigCalendar
                    onEventDrop={this.moveEvent}
                    selectable
                    onSelectSlot={this.onSelectSlot}
                    components={components}
                    messages={localization}
                    events={this.state.events}
                    titleAccessor="name"
                    startAccessor="start_date"
                    endAccessor="end_date"
                />
            </div>
        );
    }
}
