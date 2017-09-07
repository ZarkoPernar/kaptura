import React, { PureComponent } from 'react'
import Autocomplete from 'react-autocomplete'
import debounce from 'lodash/debounce'
import classnames from 'classnames'

import InputWrapper from '../form/InputWrapper'
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


export default class SearchProjects extends PureComponent {
    state = {
        results: [],
        value: '',
        hasFocus: false,
    }

    componentWillMount() {
        this.props.searchFn().then((results) => {
            this.setState({
                results,
            })
        })
    }

    onFocus = () => {
        this.setState({ hasFocus: true })
    }

    onBlur = () => {
        this.setState({ hasFocus: false })
    }

    onSelect = (value, item) => {
        this.setState({
            value,
        })
        this.props.onSelect(value, item)
    }

    onChange = (e) => {
        this.setState({
            value: e.target.value,
        })

        this.searchDebounce(e.target.value)
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
        const [ onFocus, onBlur ] = proxyFunctions(['onFocus', 'onBlur'], props, this)

        return (
            <input className="form-control dd__input" {...props} onBlur={onBlur} onFocus={onFocus} />
        )
    }

    renderItem = (item, isHighlighted) => {
        return (
            <div className={classnames('dd__item', { 'dd__item--highlighted': isHighlighted })}>
                {item.name}
            </div>
        )
    }

    render() {
        const { searchFn, onSelect, ...rest } = this.props
        return (
            <InputWrapper id="search-autocomplete" label="Trazi" hasValue={!!this.state.value} hasFocus={this.state.hasFocus}>
                <Autocomplete
                    items={this.state.results}
                    renderItem={this.renderItem}
                    renderInput={this.renderInput}
                    renderMenu={renderMenu}
                    value={this.state.value}
                    onChange={this.onChange}
                    onSelect={this.onSelect}
                    {...rest}
                />
            </InputWrapper>
        )
    }
}
