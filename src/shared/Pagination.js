import React, { Component } from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames'
import './pagination.scss'

import Button from './Button'

class PaginationComponent extends Component {
    static propTypes = {
        currentPage: PropTypes.number,
        nextPage: PropTypes.func,
        prevPage: PropTypes.func,
    }

    state = {
        currentPage: 1,
    }

    componentWillReceiveProps(nextProps) {
        this.setState(state => ({
            currentPage: nextProps.currentPage
        }))
    }

    onChange = (event) => {
        const currentPage = parseInt(event.target.value)
        if (!currentPage) return
        this.setState(state => ({ currentPage }))
    }

    onKeyDown = (event) => {
        if (event.keyCode === 13) {
            console.log('GOTO: ' + this.state.currentPage)
        }
    }

    render() {
        return (
            <div className="pagination">
                <Button key="prev" onClick={this.props.prevPage}>
                    Predhodna Stranica
                </Button>

                <span key="page">
                    <input value={this.state.currentPage} onChange={this.onChange} onKeyDown={this.onKeyDown}/>
                </span>

                <Button key="next" onClick={this.props.nextPage}>
                    Sljedeca Stranica
                </Button>
            </div>
        )
    }
}


export default PaginationComponent
