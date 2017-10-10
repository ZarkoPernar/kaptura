import React, { Component } from 'react';
import { connect } from 'react-redux'

import Card, { CardBody } from '../shared/Card'
import Subtitle from '../shared/Subtitle'
import SearchAddress from '../shared/Address'
import FormGroup from '../shared/form/FormGroup'
import Input from '../shared/form/Input'
import Flex from '../shared/flex'
import Cell from '../shared/Cell'
import Button from '../shared/Button'
import ButtonLoader from '../shared/ButtonLoader'
import Box from '../shared/Box'

import { createUpdateAction } from './reducer'

const toState = state => ({
    company: state.companyInfo.data,
    updating: state.companyInfo.updating,
})
const toDispatch = { save: info => createUpdateAction(info) }

@connect(toState, toDispatch)
export default class CompanyInfo extends Component {
    static defaultProps = {
        company: { }
    }

    state = {
        company: {
            // optional model fields need to be declared
            // for controlled inputs
            google_address: '',
            company_number: '',
        },
        forUpdate: {}
    }

    constructor(props) {
        super(props)

        this.state.company = {
            ...this.state.company,
            ...props.company,
        }
        this.state.forUpdate._id = this.state.company._id
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.company !== this.props.company) {
            this.setState({
                company: {
                    ...this.state.company,
                    ...nextProps.company,
                },
                forUpdate: {
                    ...this.state.forUpdate,
                    _id: nextProps.company._id,
                }
            })
        }
    }

    onChange = (value, name) => {
        this.setState({
            company: {
                ...this.state.company,
                [name]: value
            },
            forUpdate: {
                _id: this.state.company._id,
                ...this.state.forUpdate,
                [name]: value
            }
        })
    }

    onAddressSelect = (address) => {
        this.setState({
            company: {
                ...this.state.company,
                ...address,
            },
            forUpdate: {
                _id: this.state.company._id,
                ...this.state.forUpdate,
                ...address,
            }
        })


    }

    save = () => {
        this.props.save(this.state.forUpdate)
    }

    render() {
        if (!this.props.company._id) return null
        const cellStyle = { maxWidth: '50%' }

        return (

            <Box>
                <Flex grid>
                    <Cell sm="7">
                        <Card>
                            <CardBody>
                                <Subtitle>Osnovne Informacije</Subtitle>
                                <Flex grid>
                                    <Cell>
                                        <FormGroup label="Ime Tvrtke">
                                            <Input name="name" value={this.state.company.name} onChange={this.onChange} />
                                        </FormGroup>
                                    </Cell>

                                    <Cell>
                                        <FormGroup label="OIB">
                                            <Input name="company_number" value={this.state.company.company_number} onChange={this.onChange} />
                                        </FormGroup>
                                    </Cell>
                                </Flex>
                                <Flex grid>
                                    <Cell>
                                        <FormGroup label="Email">
                                            <Input type="email" name="email" value={this.state.company.email} onChange={this.onChange} />
                                        </FormGroup>
                                    </Cell>

                                    <Cell>
                                        <FormGroup label="IBAN">
                                            <Input name="bank_account" value={this.state.company.bank_account} onChange={this.onChange} />
                                        </FormGroup>
                                    </Cell>

                                    <Cell>
                                        <FormGroup label="Adresa">
                                            <SearchAddress name="google_address" onSelect={this.onAddressSelect} value={this.state.company.google_address} onChange={this.onChange} />
                                        </FormGroup>
                                    </Cell>
                                </Flex>

                                <ButtonLoader loading={this.props.updating} onClick={this.save}>
                                    Spremi Promjene
                                </ButtonLoader>
                            </CardBody>
                        </Card>
                    </Cell>

                    <Cell sm="5">
                        <Box padding>
                            <Subtitle>Osnovne Informacije</Subtitle>
                            Ove informacije korisne su za automatsku izradu faktura
                        </Box>
                    </Cell>
                </Flex>
            </Box>
        );
    }
}
