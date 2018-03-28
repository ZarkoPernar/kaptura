import React, { Component } from 'react'
import PropTypes from 'prop-types'
import merge from 'lodash/merge'
import set from 'lodash/set'
import debounce from 'lodash/debounce'

import Flex from '../shared/flex'
import Cell from '../shared/Cell'
import Input from '../shared/form/Input'
import Textarea from '../shared/form/Textarea'
import FormGroup from '../shared/form/FormGroup'
import Checkbox from '../shared/form/Checkbox'
import Button from '../shared/Button'
import Datepicker from '../shared/Datepicker'
import Address from '../shared/Address'
import Form from '../shared/form/Form'

const actionStyles = {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    marginTop: '3rem',
    marginBottom: '1rem',
}

class EditClientForm extends Component {
    static propTypes = {
        invoice: PropTypes.object.isRequired,
        onSubmit: PropTypes.func,
        onDismiss: PropTypes.func,
    }

    static defaultProps = {
        invoice: {},
    }

    onChange = values => {
        console.log(values)

        const invoice = {
            _id: this.props.invoice._id, // Original
            ...values, // Any edited fields
        }

        this.props.onChange(invoice)
    }

    onChangeDebounced = debounce(this.onChange, 300)

    onPlaceChange = data => {
        this.props.onSubmit({
            _id: this.props.invoice._id,
            ...data,
        })
    }

    render() {
        return (
            <Form
                onSubmit={this.props.onSubmit}
                onChange={this.onChangeDebounced}
                initialValues={this.props.invoice}
            >
                <input
                    name="_id"
                    defaultValue={this.props.invoice._id}
                    type="text"
                    hidden
                />

                <Flex grid>
                    <Cell md="6">
                        <FormGroup label="Ime Tvrtke">
                            <Input name="company.name" />
                        </FormGroup>
                    </Cell>
                    <Cell md="3">
                        <FormGroup label="OIB">
                            <Input name="company.company_number" />
                        </FormGroup>
                    </Cell>
                    <Cell md="3">
                        <FormGroup label="IBAN">
                            <Input name="company.bank_number" />
                        </FormGroup>
                    </Cell>
                    <Cell md="12">
                        <FormGroup label="Adresa">
                            <Address
                                name="company.google_address"
                                onSelect={this.onPlaceChange}
                            />
                        </FormGroup>
                    </Cell>
                    <Cell md="6">
                        <FormGroup label="Ime klijenta">
                            <Input name="client.name" />
                        </FormGroup>
                    </Cell>
                    <Cell md="3">
                        <FormGroup label="OIB klijenta">
                            <Input name="client.company_number" />
                        </FormGroup>
                    </Cell>
                    <Cell md="3">
                        <FormGroup label="IBAN klijenta">
                            <Input name="client.bank_number" />
                        </FormGroup>
                    </Cell>
                    <Cell md="12">
                        <FormGroup label="Adresa klijenta">
                            <Address
                                name="client.google_address"
                                onSelect={this.onPlaceChange}
                            />
                        </FormGroup>
                    </Cell>
                    <Cell md="3">
                        <FormGroup label="Datum Izdavanja">
                            <Datepicker name="issue_date" />
                        </FormGroup>
                    </Cell>
                    <Cell md="3">
                        <FormGroup label="Datum Dospijeca">
                            <Datepicker name="due_date" />
                        </FormGroup>
                    </Cell>
                    <Cell md="3">
                        <FormGroup label="Nacin placanja">
                            <Input name="payment_type" />
                        </FormGroup>
                    </Cell>
                    <Cell md="3">
                        <FormGroup label="Opis placanja">
                            <Textarea name="payment_information" />
                        </FormGroup>
                    </Cell>
                    <Cell md="6">
                        <FormGroup label="Uvijeti">
                            <Textarea name="terms" />
                        </FormGroup>
                    </Cell>
                    <Cell md="6">
                        <FormGroup label="Javne biljeske">
                            <Textarea name="notes" />
                        </FormGroup>
                    </Cell>
                    <Cell md="6">
                        <FormGroup label="Privatne biljeske">
                            <Textarea name="notes" />
                        </FormGroup>
                    </Cell>

                    <Cell md="2">
                        <FormGroup>
                            <Checkbox label="Placeno" name="payment_received" />
                        </FormGroup>
                    </Cell>
                </Flex>

                {/* <div style={actionStyles}>
                    <Button color="primary" type="submit">
                        {this.props.invoice._id ? 'Spremi' : 'Posalji'}
                    </Button>

                    <Button onClick={this.dismiss} clear style={{marginRight: '25px'}}>
                        Odustani
                    </Button>
                </div> */}
            </Form>
        )
    }
}

export default EditClientForm
