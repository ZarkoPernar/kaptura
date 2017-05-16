import React, { Component } from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames'

import './select.scss'

const selectOption = PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
})

const GO_UP = 38
const GO_DOWN = 40
const ENTER = 13


const enter = (state, props) => {
    const selectedResult = getResult(state, props, state.resHighlighted)
    return {
        value: selectedResult.value,
        selectedResult,
    }
}

const goUp = (state, props) => {
    return goDirection(state, props, false)
}

const goDown = (state, props) => {
    return goDirection(state, props, true)
}

const goDirection = (state, props, goDown) => {
    const resHighlighted = goDown ? state.resHighlighted + 1 : state.resHighlighted - 1
    const value = getResult(state, props, resHighlighted).value
    return {
        value,
        resHighlighted,
    }
}

const getResult = (state, props, index) => {
    const options = state.results || props.options
    return options[index]
}

class SelectComponent extends Component {
    static propTypes = {
        options: PropTypes.arrayOf(selectOption),
        multi: PropTypes.bool,
        name: PropTypes.string,
        value: PropTypes.string,
        onChange: PropTypes.func,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
    }

    static defaultProps = {
        value: '',
        options: [],
    }

    state = {
        value: '',
        isFocused: false,
        isForceClosed: false,
        dropDownHeight: 0,
        resHighlighted: 0,
        selectedResult: null,
    }

    constructor(props) {
        super(props)

        this.state.value = this.props.value
    }

    componentDidMount = () => {
        console.log('select mounted')
    }

    componentWillUnmount = () => {
        console.log('select un-mounted')
    }

    onFocus = () => {
        this.setState({
            isFocused: true,
        })
        this.props.onFocus()
    }

    onBlur = () => {
        this.setState({
            isFocused: false,
        })
        this.props.onBlur()
    }

    onChange = (event) => {
        const value = event.target.value

        this.setState({
            value: value
        })

        this.searchResults(value)
    }

    searchResults = (value) => {
        const searchValue = value.toLowerCase()

        const results = this.props.options.filter(option => ~option.label.toLowerCase().indexOf(searchValue))

        this.setState({
            results
        })
    }

    navigateResults = (direction) => {
        if (direction === GO_UP) {
            this.setState(goUp)
        } else if (direction === GO_DOWN) {
            this.setState(goDown)
        } else if (direction === ENTER) {
            this.setState(enter, this.notifyChange)
        }

    }

    notifyChange = () => {
        this.props.onChange(this.state.selectedResult.value)
    }

    getDropdownContainerRef = (el) => {
        console.log(el)
        this.setState({
            dropDownHeight: el.offsetHeight,
        })
    }

    onKeyDown = (event) => {
        this.navigateResults(event.keyCode)
    }

    render() {
        const dropDownHeight = this.state.isFocused && !this.state.isForceClosed ? this.state.dropDownHeight + 6 : 0
        const results = this.state.results || this.props.options

        return (
            <div className={classnames('enhanced-select', {
                    'enhanced-select--is-focused': this.state.isFocused,
                    'enhanced-select--closed': this.state.isForceClosed,
                })}>
                <input type="text" className={'enhanced-select__input ' + this.props.className} key="input"
                    value={this.state.value}
                    onChange={this.onChange}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    onKeyDown={this.onKeyDown}
                    id={this.props.id} />
                <div className="enhanced-select__dropdown" key="dropdown"  style={{height: dropDownHeight + 'px'}}>
                    <div className="enhanced-select__dropdown__container" ref={this.getDropdownContainerRef}>
                        {
                            results.map((option, index) => (
                                <div className={classnames('enhanced-select__dropdown__option', {
                                    'enhanced-select__dropdown__option--highlighted': index === this.state.resHighlighted
                                })} key={option.value}>
                                    {option.label}
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default SelectComponent


