import React from 'react'
import yup from 'yup'

import Select from '../shared/form/Select'
import Form from '../shared/form/Form'
import Input from '../shared/form/Input'
import FormGroup from '../shared/form/FormGroup'
import Button from '../shared/Button'
import Checkbox from '../shared/form/Checkbox'

const options = [
    {
        label: 'Kuna',
        value: 'HRK',
        symbol: 'kn',
        symbolAfter: true,
        separator: '.',
        decimal: ',',
    },
    {
        label: 'Euro',
        value: 'EUR',
        symbol: '€',
    },
    {
        label: 'Dollar',
        value: 'USD',
        symbol: '$',
    },
    {
        label: 'British Pound',
        value: 'GBP',
        symbol: '£',
    },
]

const style = {
    minWidth: '28em',
}
const EditItemForm = ({ onSubmit, onDismiss }) => {
    let currency
    return (
        <div style={style}>
            <Form
                onSubmit={val => {
                    onSubmit({
                        ...val,
                        currency,
                    })
                }}
                autoComplete="off"
                formData={{ email: '' }}
                validationSchema={yup.object().shape({
                    price: yup
                        .number()
                        .typeError('Cijena mora biti izrazena kao broj')
                        .positive('Cijena mora biti pozitivan broj'),
                    quantity: yup
                        .number()
                        .typeError('Kolicina mora biti izrazena kao broj')
                        .positive('Kolicina mora biti pozitivan broj'),
                    name: yup
                        .string()
                        .required('Naziv stavke je obavezno polje'),
                    brand: yup.string(),
                    type: yup.string(),
                    unit: yup.string(),
                    currency: yup.string(),
                    // website: yup.string().url(),
                    // createdOn: yup.date().default(function() {
                    //     return new Date()
                    // }),
                })}
            >
                <FormGroup label="Naziv">
                    <Input name="name" autoComplete="off" />
                </FormGroup>

                <FormGroup label="Tip">
                    <Input name="type" autoComplete="off" />
                </FormGroup>

                <FormGroup label="Proizvodjac">
                    <Input name="brand_name" autoComplete="off" />
                </FormGroup>

                <FormGroup label="Cijena">
                    <Input name="price" type="tel" autoComplete="off" />
                </FormGroup>

                <FormGroup label="Valuta" ignoreField>
                    {/* <Input name="currency" autoComplete="off" /> */}
                    <Select
                        name="currency"
                        options={options}
                        onChange={val => {
                            console.log(val), (currency = val)
                        }}
                    />
                </FormGroup>

                <FormGroup label="Kolicina">
                    <Input name="quantity" type="tel" autoComplete="off" />
                </FormGroup>

                <FormGroup label="Mjerna Jedinica">
                    <Input name="unit" autoComplete="off" />
                </FormGroup>

                <FormGroup ignoreField>
                    <Checkbox
                        label="Dodaj u favorite"
                        name="shouldAddToFavorites"
                    />
                </FormGroup>

                <Button
                    type="submit"
                    color="primary"
                    style={{ marginRight: '2rem' }}
                >
                    Posalji
                </Button>

                <Button onClick={onDismiss} clear>
                    Otkazi
                </Button>
            </Form>
        </div>
    )
}

export default EditItemForm
