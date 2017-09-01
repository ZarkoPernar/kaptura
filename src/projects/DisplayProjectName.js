import React from 'react'

export default function DisplayProjectName(props) {
    return <span onClick={_ => props.onClick(props.item)}>{ props.item.project_name || '-' }</span>
}
