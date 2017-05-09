import React from 'react'

export default function transactionHead() {
    return (
        <thead>
            <tr>
                <th key="index" />

                <th key="name">
                    Ime
                </th>

                <th key="description">
                    Opis
                </th>

                <th key="start_date">
                    Počinje
                </th>

                <th key="end_date">
                    Završava
                </th>
            </tr>
        </thead>
    )
}
