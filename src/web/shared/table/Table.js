import React, { PureComponent, Children } from 'react'
import PropTypes from 'prop-types'

import TableRowOverlay from './TableRowOverlay'
import './table.scss'

class TableComponent extends PureComponent {

    render () {
        return (
            <div className="table-holder">
                <table className="table">
                    {this.props.children[0]}
                    <tbody>
                        {this.props.children[1]}
                    </tbody>
                </table>
            </div>
        )
    }
    // static childContextTypes = {
    //     cellClick: PropTypes.func,
    // }

    // getChildContext() {
    //     return { cellClick: this._cellClick }
    // }

    // _cellClick = (e) => {
    //     console.log(e)
    // }

    /*render() {
        let overlay
        Children.forEach(this.props.children, (child, i) => {
            // Ignore the first child
            if (child.type === TableRowOverlay) {
                overlay = child
            }
        })
        return (
            <div className="table-holder">
                {overlay || null}
                <table className="table">
                    {
                        Children.map(this.props.children, (child, i) => {
                            // Ignore the first child
                            if (child.type === TableRowOverlay) return
                            return child
                        })
                    }
                </table>
            </div>
        )
    }*/
}

TableComponent.propTypes = {

}

export default TableComponent
