import React from 'react'

export default function Label({ children, id }) {
    return (
        <label className="form-group__label" htmlFor={id}>
            {children}
        </label>
    )
}
