import React, { Component } from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames'
import './pagination.scss'

import Button from './Button'
import Input from './form/Input'
import FormGroup from './form/FormGroup'

class PaginationComponent extends Component {
    static propTypes = {
        currentPage: PropTypes.number,
        nextPage: PropTypes.func,
        prevPage: PropTypes.func,
    }

    state = {
        currentPage: 1,
    }

    componentWillReceiveProps({ currentPage }) {
        if (currentPage === this.state.currentPage) return

        this.setState({ currentPage })
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

                <FormGroup label="Idi na stranicu">
                    <Input name="page" value={this.state.currentPage} onChange={this.onChange} onKeyDown={this.onKeyDown}/>
                </FormGroup>

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
