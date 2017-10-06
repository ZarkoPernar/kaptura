import React from 'react'
import PropTypes from 'prop-types'
import MdPlay from 'react-icons/lib/md/play-arrow'
import MdStop from 'react-icons/lib/md/stop'
import { pure } from 'recompose'

import Button from '../shared/Button'
import DisplayDuration from './DisplayDuration'

const ClockButton = ({ onToggle, isActive, activeLog })=> {
    return (
        <Button onClick={onToggle} clear>
            {isActive ? 'Stop' : 'Start'}
            {
                (
                    isActive ?
                        <MdStop className="clock-toggle__icon clock-toggle__icon--stop" /> :
                        <MdPlay className="clock-toggle__icon clock-toggle__icon--start" />
                )
            }

            {
                (
                    isActive ?
                        <DisplayDuration>{activeLog.check_in}</DisplayDuration> :
                        '0:00:00'
                )
            }
        </Button>
    );
};

ClockButton.propTypes = {
    onToggle: PropTypes.func.isRequired,
    isActive: PropTypes.bool,
    activeLog: PropTypes.shape({
        check_in: PropTypes.string,
    }),

};

export default pure(ClockButton);
