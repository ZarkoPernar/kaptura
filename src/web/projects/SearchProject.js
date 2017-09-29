import React, { Component } from 'react'

import { list } from './api'
import Search from '../shared/search'

// const debounced = debounce(list, 500)
const getValue = item => item.name
const searchFn = (searchTerm) => {
    const params = searchTerm ? {
        name: searchTerm,
    } : {}
    return list(params)
}

export default class SearchProjects extends Component {
    onSelect = (inputValue, item) => {
        this.props.onSelect(item)
    }

    render() {
        return(
            <Search
                {...this.props}
                searchFn={searchFn}
                getItemValue={getValue}
                onSelect={this.onSelect} />
        )
    }
}
