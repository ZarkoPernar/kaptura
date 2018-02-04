import React, { Component, Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field } from 'formik'
import yup from 'yup'

import FormGroup from './FormGroup'
import Input from './Input'

// const ThemeContext = React.createContext('light')
// class ThemeProvider extends React.Component {
//   state = {theme: 'light'}
//   render() {
//     return ThemeContext.provide(this.state.theme, this.props.children)
//   }
// }

// const ThemeConsumer = ({children}) => ThemeContext.consume(children)

// class App extends React.Component {
//   render() {
//     <ThemeProvider>
//       <ThemeConsumer>{val => <div>{val}</div>}</ThemeConsumer>
//     </ThemeProvider>
//   }
// }

class EnhancedForm extends Component {
    handleSubmit = (
        values,
        { setSubmitting, setErrors /* setValues and other goodies */ },
    ) => {
        // do async validating after submitting to some api
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
                    <Form>
                        {Children.map(this.props.children, formGroup => {
                            const inputName =
                                formGroup.props.children.props.name

                            return cloneElement(formGroup, {
                                onBlur: handleBlur,
                                onChange: handleChange,
                                error: errors[inputName],
                            })
                        })}
                    </Form>
                )}
            />
        )
    }
}

EnhancedForm.propTypes = {}

export default EnhancedForm
