import React, { Component } from 'react'
import Autocomplete from 'react-autocomplete'
import debounce from 'lodash/debounce'
import classnames from 'classnames'

import { list } from './api'
import './search-projects.scss'

// const debounced = debounce(list, 500)

export default class SearchProjects extends Component {
    state = {
        results: [],
        value: '',
    }

    componentWillMount() {
        list().then((results) => {
            this.setState({
                results,
            })
        })
    }

    onSelect = (value, item) => {
        this.setState({ value })
        this.props.onSelect(item, this.props.item)
    }

    onChange = (e) => {
        this.setState({
            value: e.target.value,
        })

        this.searchDebounce(e.target.value)
    }

    search = (searchTerm) => {
        list({
            name: searchTerm,
        }).then((results) => {
            this.setState({
                results,
            })
        })
    }
    searchDebounce = debounce(this.search, 500)

    getValue = (item) => item.name

    renderInput = (props) => {
        return (
            <input className="dd__input" {...props} />
        )
    }

    renderItem = (item, isHighlighted) => {
        return (
            <div className={classnames('dd__item', {'dd__item--highlighted': isHighlighted})}>
                {item.name}
            </div>
        )
    }

    render() {
        return(
            <Autocomplete
                getItemValue={this.getValue}
                items={this.state.results}
                renderItem={this.renderItem}
                renderInput={this.renderInput}
                value={this.state.value}
                onChange={this.onChange}
                onSelect={this.onSelect}
            />
        )
    }
}
