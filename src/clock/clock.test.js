import { inOut, checkIn, checkOut, isUnfinished, isValidDate } from './clock'


describe('Clock', () => {
    describe('isValidDate', () => {

        it('exits', () => {
            expect(isValidDate).toBeDefined()
        })

        it('returns true for a valid date', () => {
            const actualResult = isValidDate(new Date())
            const expectedResult = true

            expect(actualResult).toEqual(expectedResult)
        })

        it('returns false for an invalid date', () => {
            const invalidDate = new Date(Date.parse('fdssdf'))
            const actualResult = isValidDate(invalidDate)
            const expectedResult = false

            expect(actualResult).toEqual(expectedResult)
        })
    })

    describe('inOut', () => {

        it('exits', () => {
            expect(inOut).toBeDefined()
        })

        it('returns a new log in if nothing is sent', () => {
            const actualResult = inOut()
            expect(actualResult.check_in).toBeDefined()
        })

        it('returns a new complete log based on unfinished log', () => {
            const log = inOut(checkIn())

            const actualResult = isUnfinished(log)
            const expectedResult = false

            expect(actualResult).toEqual(expectedResult)
        })

        it('returns the same log if that log is finished', () => {
            const log = checkOut(checkIn())

            const actualResult = inOut(log)
            const expectedResult = log

            expect(actualResult).toEqual(expectedResult)
        })

    })

    describe('checkIn', () => {

        it('exits', () => {
            expect(checkIn).toBeDefined()
        })

        it('returns the log with check_in field filled in', () => {
            const actualResult = checkIn()
            expect(actualResult.check_in).toBeDefined()
        })

        it('the check_in field is a valid Date string', () => {
            const { check_in } = checkIn()
            const parsedNumber = Date.parse(check_in)
            const date = new Date(parsedNumber)

            const actualResult = isValidDate(date)
            const expectedResult = true

            expect(actualResult).toEqual(expectedResult)
        })

    })

    describe('isUnfinished', () => {

        it('exits', () => {
            expect(isUnfinished).toBeDefined()
        })

        it('returns false if arr is empty', () => {
            const logs = []
            const actualResult = isUnfinished(logs)
            const expectedResult = false

            expect(actualResult).toEqual(expectedResult)
        })

        it('returns false if all logs are finished', () => {
            const logs = [
                checkOut(checkIn()),
                checkOut(checkIn()),
            ]
            const actualResult = isUnfinished(logs)
            const expectedResult = false

            expect(actualResult).toEqual(expectedResult)
        })

        it('returns true if last log is unfinished', () => {
            const logs = [
                checkOut(checkIn()),
                checkIn(),
            ]
            const actualResult = isUnfinished(logs)
            const expectedResult = true

            expect(actualResult).toEqual(expectedResult)
        })

        it('returns false if log is finished', () => {
            const log = checkOut(checkIn())
            const actualResult = isUnfinished(log)
            const expectedResult = false

            expect(actualResult).toEqual(expectedResult)
        })

        it('returns true if log is unfinished', () => {
            const log = checkIn()
            const actualResult = isUnfinished(log)
            const expectedResult = true

            expect(actualResult).toEqual(expectedResult)
        })

        it('returns true if param is an empty object', () => {
            const actualResult = isUnfinished({})
            const expectedResult = false

            expect(actualResult).toEqual(expectedResult)
        })

        it('returns false if param is undefined', () => {
            const actualResult = isUnfinished()
            const expectedResult = false

            expect(actualResult).toEqual(expectedResult)
        })

    })

})
