import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

const rootLink = '/'

class Link extends Component {
    static propTypes = {
        // link: PropTypes.objectOf,
    }

    isActive = (match, location) => {
        if (match === null) return false

        // main link is matched
        if (match.isExact) return true

        // this rule is for "/"" (home) because if we don't use exact on NavLink,
        // since all links start with "/", all will match
        // and we cant use exact on main links since they wont match for sub links
        // therefore no --active applied on the main link and the sub links remain hidden
        if (match.path === rootLink && location.pathname !== rootLink) return false

        // there is a match on one of the sub links
        return true
    }

    render() {
        const { link } = this.props
        const Icon = link.icon
        const sublinks = link.sublinks || []

        return (
            <div className="nav__item">
                <NavLink to={link.to} key={link.key} className="nav__link" activeClassName="nav__link--active" isActive={this.isActive}>
                    <span className="nav__link__bg">
                        <Icon className="nav__link__icon" />
                        {link.title}
                    </span>
                </NavLink>

                <div className="nav__sub">
                    {
                        sublinks.map(subLink => (
                            <NavLink
                                key={subLink.key}
                                to={subLink.to}
                                className="nav__sub__link"
                                activeClassName="nav__sub__link--active">
                                { subLink.title }
                            </NavLink>
                        ))
                    }

                </div>
            </div>


        )
    }
}


export default Link
