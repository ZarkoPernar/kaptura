import React, { Component } from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames'
import './pagination.scss'

import Button from './Button'
import Input from './form/Input'

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
        this.setState({
            currentPage: nextProps.currentPage
        })
    }

    onChange = (value) => {
        const currentPage = parseInt(value)

        if (!currentPage) return

        this.setState({ currentPage })
    }

    onKeyDown = (event) => {
        if (event.keyCode === 13) {
            console.log('GOTO: ' + this.state.currentPage)
        }
    }

    render() {
        return (
            <div className="pagination">
                <Button onClick={this.props.prevPage} disabled={this.props.currentPage === 1}>
                    <span className="pagination__nav pagination__nav--long">
                        Predhodna
                    </span>
                    <span className="pagination__nav pagination__nav--short">
                        {'<'}
                    </span>
                </Button>

                <div>
                    <Input name="page" value={this.state.currentPage} onChange={this.onChange} onKeyDown={this.onKeyDown}/>
                </div>

                <Button onClick={this.props.nextPage}>
                    <span className="pagination__nav pagination__nav--long">
                        Sljedeca
                    </span>
                    <span className="pagination__nav pagination__nav--short">
                        {'>'}
                    </span>
                </Button>
            </div>
        )
    }
}


export default PaginationComponent
