import React, { Component } from 'react'

import Card, { CardBody } from '../shared/Card'

export default class TvrtkaPageComponent extends Component {
    render() {
        return (
            <div className="page--padding">
                <Card>
                    <CardBody>
                        <h2>Tvrtka</h2>
                    </CardBody>
                </Card>
            </div>
        )
    }
}
