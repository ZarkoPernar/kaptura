import React, { PureComponent } from 'react'
import Autocomplete from 'react-autocomplete'
import debounce from 'lodash/debounce'
import classnames from 'classnames'

import './search.scss'

const proxyFunctions = (names, props, component) => {
    return names.map(name => {
        return function(...args) {
            props[name](...args)
            component[name](...args)
        }
    })
}

function renderMenu(items, value, style) {
    // return <div style={{ ...style, top: 0, left: 0, }} children={items} />
    return <div className="dd__menu" children={items} />
}


export default class Search extends PureComponent {
    state = {
        results: [],
    }

    componentWillMount() {
        this.props.searchFn().then((results) => {
            this.setState({
                results,
            })
        })
    }

    onSelect = (value, item) => {
        this.setState({
            value,
        })
        this.props.onSelect(value, item)
    }

    onChange = (e) => {
        const value = e.target.value

        if (this.props.onChange) {
            this.props.onChange(value, this.props.name)
        }

        this.searchDebounce(value)
    }

    search = (searchTerm) => {
        this.props.searchFn(searchTerm)
            .then((results) => {
                this.setState({
                    results,
                })
            })
    }

    searchDebounce = debounce(this.search, 500)

    renderInput = (props) => {
        // have to spy on onFocus, onBlur, can't replace them
        // so we create new functions that call both component function
        // and the original fn from props
        const [ onFocus, onBlur ] = proxyFunctions(['onFocus', 'onBlur'], props, this.props)

        return (
            <input id={this.props.id} className={classnames('form-control dd__input', this.props.className)} {...props} onFocus={onFocus} onBlur={onBlur} />
        )
    }

    renderItem = (item, isHighlighted) => {
        return (
            <div key={item._id} className={classnames('dd__item', { 'dd__item--highlighted': isHighlighted })}>
                {item.name}
            </div>
        )
    }

    render() {
        const { searchFn, onSelect, ...rest } = this.props
        return (
            <Autocomplete
                {...rest}
                items={this.state.results}
                wrapperStyle={{display: 'block', width: '100%'}}
                renderItem={this.renderItem}
                renderInput={this.renderInput}
                renderMenu={renderMenu}
                value={this.props.value}
                onChange={this.onChange}
                onSelect={this.onSelect}
            />
        )
    }
}
