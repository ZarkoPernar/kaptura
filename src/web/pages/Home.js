import React, { Component } from 'react'
import HomeIcon from 'react-icons/lib/md/home'

import Card, { CardBody } from '../shared/Card'
import Button from '../shared/Button'
import Flex from '../shared/flex'

import FormGroup from '../shared/form/FormGroup'
import Input from '../shared/form/Input'
import Label from '../shared/form/Label'

export default class HomePage extends Component {
    render() {
        return (
            <div className="page--padding">
                <Card>
                    <CardBody>
                        <h2>Buttons</h2>
                        <Flex grid>
                            <div className="padding-sm">
                                <Button small>
                                    Button small
                                </Button>
                            </div>
                            <div className="padding-sm">
                                <Button>
                                    Button
                                </Button>
                            </div>
                            <div className="padding-sm">
                                <Button large>
                                    Button large
                                </Button>
                            </div>
                        </Flex>

                        <h3>Colors</h3>
                        <Flex grid>
                            <div className="padding-sm">
                                <Button clear>
                                    Button clear
                                </Button>
                            </div>

                            <div className="padding-sm">
                                <Button clear color="primary">
                                    {'Button clear color="primary"'}
                                </Button>
                            </div>

                            <div className="padding-sm">
                                <Button clear color="danger">
                                    {'Button clear color="danger"'}
                                </Button>
                            </div>
                        </Flex>

                        <Flex grid>
                            <div>
                                <div className="padding-top">
                                    <Button color="primary">
                                        {'Button color="primary"'}
                                    </Button>
                                </div>
                            </div>
                            <div>
                                <div className="padding-top">
                                    <Button color="danger">
                                        {'Button color="danger"'}
                                    </Button>
                                </div>
                            </div>
                        </Flex>

                        <h3>Block</h3>
                        <Button color="primary" block>
                            Button block
                        </Button>

                    </CardBody>

                    <Button color="primary" full>
                        Button full
                    </Button>
                </Card>

                <h2>Form</h2>
                <Card>
                    <CardBody>
                        <h4>No label</h4>
                        <FormGroup>
                            <Input />
                        </FormGroup>

                        <h4>Label as string prop</h4>
                        <FormGroup label="String prop">
                            <Input />
                        </FormGroup>

                        <h4>Label as a child element</h4>
                        <FormGroup label={<Label><HomeIcon style={{fontSize: '1.2rem'}} /> Label child</Label>}>
                            <Input />
                        </FormGroup>

                    </CardBody>

                </Card>

            </div>
        )
    }
}
