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

const actionStyles = {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    marginTop: '3rem',
    marginBottom: '1rem',
}

class EditClientForm extends Component {
    static propTypes = {
        invoice: PropTypes.object,
        onSubmit: PropTypes.func,
        onDismiss: PropTypes.func,
    }

    static defaultProps = {
        invoice: {}
    }

    state = {
        invoice: {
            number: '',
            company: {
                name: '',
                company_number: '',
                bank_number: '',
                google_address: '',
            },
            client: {
                name: '',
                company_number: '',
                bank_number: '',
                google_address: '',
            },
        }
    }

    constructor(props) {
        super(props)

        this.state.invoice = merge(this.state.invoice, props.invoice)
    }

    getFormEl = (el) => {
        this._formEl = el
    }

    validate = (client) => {
        if (!client.name) {
            throw Error('Project must have a valid name!')
        }
    }

    _submit = (event) => {
        event.preventDefault()

        const invoice = {
            ...this.props.invoice, // Original
            ...this.state.invoice, // Any edited fields
        }

        // try {
        //     this.validate(invoice)
        // } catch (err) {
        //     // TODO: add ui error notification
        //     return console.error(err)
        // }

        this.props.onSubmit(invoice)
    }

    changes = () => {
        const invoice = {
            ...this.props.invoice, // Original
            ...this.state.invoice, // Any edited fields
        }

        this.props.onChange(invoice)
    }
    onChanges = debounce(this.changes, 300)

    inputChanged = (value, path) => {
        this.setState((prevState) => ({
            invoice: set({...prevState.invoice}, path, value)
        }), this.onChanges)
    }

    onPlaceChange = (data) => {
        this.setState((prevState) => ({
            invoice: {
                ...prevState.invoice,
                ...data
            }
        }), this.onChanges)
    }

    dismiss = (e) => {
        e.preventDefault()
        this.props.onDismiss()
    }

    render() {
        return (
            <form style={{padding: '1rem'}} className="EditProject__form" ref={this.getFormEl} onSubmit={this._submit} method="POST" action={'/api/v1/invoice/' + (this.props.invoice._id ? 'update' : 'create')}>

                <input name="_id" defaultValue={this.props.invoice._id} type="text" hidden />

                <Flex grid>
                    <Cell md="6">
                        <FormGroup label="Ime Tvrtke">
                            <Input name="company.name" onChange={this.inputChanged} value={this.state.invoice.company.name} />
                        </FormGroup>
                    </Cell>
                    <Cell md="3">
                        <FormGroup label="OIB">
                            <Input name="company.company_number" onChange={this.inputChanged} value={this.state.invoice.company.company_number} />
                        </FormGroup>
                    </Cell>
                    <Cell md="3">
                        <FormGroup label="IBAN">
                            <Input name="company.bank_number" onChange={this.inputChanged} value={this.state.invoice.company.bank_number} />
                        </FormGroup>
                    </Cell>
                    <Cell md="12">
                        <FormGroup label="Adresa">
                            <Address name="company.google_address" onChange={this.inputChanged} onSelect={this.onPlaceChange} value={this.state.invoice.company.google_address} />
                        </FormGroup>
                    </Cell>
                    <Cell md="6">
                        <FormGroup label="Ime klijenta">
                            <Input name="client.name" onChange={this.inputChanged} value={this.state.invoice.client.name} />
                        </FormGroup>
                    </Cell>
                    <Cell md="3">
                        <FormGroup label="OIB klijenta">
                            <Input name="client.company_number" onChange={this.inputChanged} value={this.state.invoice.client.company_number} />
                        </FormGroup>
                    </Cell>
                    <Cell md="3">
                        <FormGroup label="IBAN klijenta">
                            <Input name="client.bank_number" onChange={this.inputChanged} value={this.state.invoice.client.bank_number} />
                        </FormGroup>
                    </Cell>
                    <Cell md="12">
                        <FormGroup label="Adresa klijenta">
                            <Address name="client.google_address" onChange={this.inputChanged} onSelect={this.onPlaceChange} value={this.state.invoice.client.google_address} />
                        </FormGroup>
                    </Cell>
                    <Cell md="3">
                        <FormGroup label="Datum Izdavanja">
                            <Datepicker name="issue_date" onChange={this.inputChanged} value={this.state.invoice.issue_date} />
                        </FormGroup>
                    </Cell>
                    <Cell md="3">
                        <FormGroup label="Datum Dospijeca">
                            <Datepicker name="due_date" onChange={this.inputChanged} value={this.state.invoice.due_date} />
                        </FormGroup>
                    </Cell>
                    <Cell md="3">
                        <FormGroup label="Nacin placanja">
                            <Input name="payment_type" onChange={this.inputChanged} value={this.state.invoice.payment_type} />
                        </FormGroup>
                    </Cell>
                    <Cell md="3">
                        <FormGroup label="Opis placanja">
                            <Textarea name="payment_information" onChange={this.inputChanged} value={this.state.invoice.payment_information} />
                        </FormGroup>
                    </Cell>
                    <Cell md="6">
                        <FormGroup label="Uvijeti">
                            <Textarea name="terms" onChange={this.inputChanged} value={this.state.invoice.terms} />
                        </FormGroup>
                    </Cell>
                    <Cell md="6">
                        <FormGroup label="Javne biljeske">
                            <Textarea name="notes" onChange={this.inputChanged} value={this.state.invoice.notes} />
                        </FormGroup>
                    </Cell>
                    <Cell md="6">
                        <FormGroup label="Privatne biljeske">
                            <Textarea name="notes" onChange={this.inputChanged} value={this.state.invoice.description} />
                        </FormGroup>
                    </Cell>

                    <Cell md="2">
                        <Checkbox label="Placeno" name="payment_received" onChange={this.inputChanged} value={this.state.invoice.payment_received} />
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
            </form>
        )
    }
}

export default EditClientForm
