import React from 'react'

export default function transactionRow({ project, index, click }) {
    return (
        <tr onClick={e => { click(project) }}>
            <td key="index">
                {index}
            </td>

            <td key="name">
                {project.name}
            </td>

            <td key="description">
                {project.description}
            </td>

            <td key="start_date">
                {project.start_date}
            </td>

            <td key="end_date">
                {project.end_date}
            </td>
        </tr>
    )
}
