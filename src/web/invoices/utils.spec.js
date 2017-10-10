import { isInvoicePassedDue } from './utils'
import { addDays, subDays } from 'date-fns'

describe('isInvoicePassedDue', () => {
    it('exists', () => {
        expect(isInvoicePassedDue).toBeDefined()
    })

    it('returns a boolean', () => {
        expect(typeof isInvoicePassedDue()).toEqual('boolean')
    })

    it('returns false if date received is before today', () => {
        const value = addDays(new Date(), 1).toISOString()

        const expectedValue = false
        const actualValue = isInvoicePassedDue(value)

        expect(actualValue).toEqual(expectedValue)
    })

    it('returns true if date received has passed', () => {
        const value = subDays(new Date(), 1).toISOString()

        const expectedValue = true
        const actualValue = isInvoicePassedDue(value)

        expect(actualValue).toEqual(expectedValue)
    })

    it('returns true if date received is today', () => {
        const value = new Date().toISOString()

        const expectedValue = true
        const actualValue = isInvoicePassedDue(value)

        expect(actualValue).toEqual(expectedValue)
    })
})
