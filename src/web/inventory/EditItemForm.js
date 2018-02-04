import React from 'react'
import yup from 'yup'

import Form from '../shared/form/Form'
import Input from '../shared/form/Input'
import FormGroup from '../shared/form/FormGroup'

const EditItemForm = () => {
    return (
        <div>
            <Form
                formData={{ email: '' }}
                validationSchema={yup.object().shape({
                    price: yup
                        .number()
                        .typeError('Cijena mora biti izrazena kao broj')
                        .positive('Cijena mora biti pozitivan broj'),
                    name: yup.string().required('Ime stavke je obavezno polje'),
                    // website: yup.string().url(),
                    // createdOn: yup.date().default(function() {
                    //     return new Date()
                    // }),
                })}
            >
                <FormGroup label="Ime">
                    <Input name="name" autoComplete="off" />
                </FormGroup>

                <FormGroup label="Proizvodjac">
                    <Input name="brand" autoComplete="off" />
                </FormGroup>

                <FormGroup label="Cijena">
                    <Input name="price" type="number" autoComplete="off" />
                </FormGroup>
            </Form>
        </div>
    )
}

export default EditItemForm
