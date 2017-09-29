import * as moment from 'moment'

import { formatValueForInput } from './utils'

describe('formatValueForInput', function() {
    // test('it returns date string as moment', () => {
    //     const expectedResult = true
    //     const actualResult = formatValueForInput(moment().toISOString(), 'date')

    //     expect(moment.isMoment(actualResult)).toEqual(expectedResult)
    // })

    test('throws when second argument "type" is missing', () => {
        expect(() => {
            formatValueForInput('')
        }).toThrow('Second argument "type" is required')
    })
})
