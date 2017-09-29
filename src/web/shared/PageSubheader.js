import React from 'react'

export default function PageSubheader({
    children,
}) {
    return (
        <div className="page__sub-header">
            <div className="page__sub-header__controls">
                { children }
            </div>
        </div>
    )
}
