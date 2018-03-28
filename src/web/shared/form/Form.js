import React, { Component, Children, cloneElement } from 'react'
import PropTypes, { func } from 'prop-types'
import { Formik, Form as FormikForm, Field } from 'formik'
import yup from 'yup'

import FormGroup from './FormGroup'
import Input from './Input'
import { flattenObject, unflattenObject } from '../../utils/flattenObject'

export const FormValidationContext = React.createContext({
    errors: {},
    values: {},
})

class Form extends Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        onChange: PropTypes.func.isRequired,
        initialValues: PropTypes.object.isRequired,
        validationSchema: PropTypes.object,
    }

    static defaultProps = {
        onSubmit: () => {},
        onChange: () => {},
        initialValues: {},
    }

    handleSubmit = (
        values,
        { setSubmitting, setErrors /* setValues and other goodies */ },
    ) => {
        // do async validating after submitting to some api
        console.log(values)
        this.props.onSubmit(unflattenObject(values))
    }

    createHandleBlur(handleBlur) {
        return function onBlur(e) {
            const element = e.target
            if (element.nodeName === 'BUTTON' || element.dataset.ignoreField)
                return
            handleBlur(e)
        }
    }

    createHandleChange(handleChange) {
        return e => {
            const element = e.target

            this.props.onChange(
                unflattenObject({
                    [element.name]: element.value,
                }),
            )

            if (element.nodeName === 'BUTTON' || element.dataset.ignoreField)
                return
            handleChange(e)
        }
    }

    render() {
        return (
            <Formik
                initialValues={flattenObject(this.props.initialValues)}
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
                    <FormikForm
                        autoComplete={this.props.autoComplete}
                        onChange={this.createHandleChange(handleChange)}
                        onBlur={this.createHandleBlur(handleBlur)}
                    >
                        <FormValidationContext.Provider
                            value={{ errors, values }}
                        >
                            {this.props.children}
                        </FormValidationContext.Provider>
                    </FormikForm>
                )}
            />
        )
    }
}

export default Form
