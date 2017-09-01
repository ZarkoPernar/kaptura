import React from 'react'

import { formatDiff } from './formatTime'
import DisplayTime from './DisplayTime'
import DisplayProjectName from '../projects/DisplayProjectName'
import SearchProject from '../projects/SearchProject'

export const LogLine = ({ item, onProjectSelect, toggleProjectSelect, showProjectSelect }) => {
    return (
        <tr id={item.check_in} className="table__row">
            <td className="table__cell">
                <div className="table__cell__content">
                    <DisplayTime time={item.check_in} />
                </div>
            </td>
            <td className="table__cell">
                <div className="table__cell__content">
                    <DisplayTime time={item.check_out} />
                </div>
            </td>
            <td className="table__cell">
                <div className="table__cell__content">
                    {formatDiff(item.check_out, item.check_in)}
                </div>
            </td>

            <td className="table__cell">
                {
                    (
                        showProjectSelect ?
                            <SearchProject item={item} onSelect={onProjectSelect} /> :
                            <DisplayProjectName item={item} onClick={toggleProjectSelect} />
                    )
                }
            </td>
        </tr>
    )
}

export default LogLine
