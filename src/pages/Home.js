import React, { Component } from 'react'

import Card from '../shared/Card'
import Button from '../shared/Button'

export default class C extends Component {
    render() {
        return (
            <div className="page--padding">
                <Card>
                    <div> Pocetna </div>
                    <Button clear>
                        Test
                    </Button>
                </Card>
            </div>
        )
    }
}
