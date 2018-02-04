import React, { Component, Children, cloneElement } from 'react'
import PropTypes, { func } from 'prop-types'
import { Formik, Form, Field } from 'formik'
import yup from 'yup'

import FormGroup from './FormGroup'
import Input from './Input'

export const FormValidationContext = React.createContext({
    errors: {},
    values: {},
})

class EnhancedForm extends Component {
    handleSubmit = (
        values,
        { setSubmitting, setErrors /* setValues and other goodies */ },
    ) => {
        // do async validating after submitting to some api
        console.log(values)
        this.props.onSubmit(values)
    }

    createHandleBlur(handleBlur) {
        return function onBlur(e) {
            if (e.target.nodeName === 'BUTTON' || e.target.dataset.ignoreField)
                return
            handleBlur(e)
        }
    }

    createHandleChange(handleChange) {
        return function onBlur(e) {
            if (e.target.nodeName === 'BUTTON' || e.target.dataset.ignoreField)
                return
            handleChange(e)
        }
    }

    render() {
        return (
            <Formik
                // initialValues={this.props.formData}
                validationSchema={this.props.validationSchema}
                // validate={this.props.validate}
                onSubmit={this.handleSubmit}
                render={({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <Form
                        autoComplete={this.props.autoComplete}
                        onChange={this.createHandleChange(handleChange)}
                        onBlur={this.createHandleBlur(handleBlur)}
                    >
                        {/* {Children.map(this.props.children, formGroup => {
                            const inputName =
                                formGroup.props.children.props.name

                            return cloneElement(formGroup, {
                                onBlur: handleBlur,
                                onChange: handleChange,
                                error: errors[inputName],
                            })
                        })} */}

                        <FormValidationContext.Provider
                            value={{ errors, values }}
                        >
                            {this.props.children}
                        </FormValidationContext.Provider>
                    </Form>
                )}
            />
        )
    }
}

EnhancedForm.propTypes = {}

export default EnhancedForm
