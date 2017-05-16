import moment from 'moment'

import { formatValueForInput, formatValueForCallback } from './utils'

describe('formatValueForCallback', function() {
    test('it returns strings as strings', () => {
        const expectedResult = 'Hello'
        const actualResult = formatValueForCallback('Hello')

        expect(actualResult).toEqual(expectedResult)
    })

    test('it returns numbers as numbers', () => {
        const expectedResult = 1
        const actualResult = formatValueForCallback(1)

        expect(actualResult).toEqual(expectedResult)
    })

    test('it returns undefied as undefied', () => {
        const expectedResult = undefined
        const actualResult = formatValueForCallback()

        expect(actualResult).toEqual(expectedResult)
    })

    test('it returns null as null', () => {
        const expectedResult = null
        const actualResult = formatValueForCallback(null)

        expect(actualResult).toEqual(expectedResult)
    })

    test('it returns moment as DateISOString', () => {
        const date = moment('03.04.1990', 'DD.MM.YYYY')
        const expectedResult = date.toISOString()
        const actualResult = formatValueForCallback(date)

        expect(actualResult).toEqual(expectedResult)
    })
})

describe('formatValueForInput', function() {
    test('it returns date string as moment', () => {
        const expectedResult = true
        const actualResult = formatValueForInput(moment().toISOString(), 'date')

        expect(moment.isMoment(actualResult)).toEqual(expectedResult)
    })

    test('throws when second argument "type" is missing', () => {
        expect(() => {
            formatValueForInput('')
        }).toThrow('Second argument "type" is required')
    })
})
