import { checkIn, checkOut, getDuration, getDurationInSeconds, getTime, isValidDate } from './clock'

let log

describe('getTime', () => {
    it('returns a Date object', () => {
        const time = getTime()
        const expectedResult = true
        const actualResult = time instanceof Date

        expect(actualResult).toEqual(expectedResult)
    })

    it('returns a valid Date', () => {
        const time = getTime()
        const expectedResult = true
        const actualResult = isValidDate(time)

        expect(actualResult).toEqual(expectedResult)
    })
})

describe('checkIn, checkOut', () => {
    it('checkIn creates a log with check_in', () => {
        log = checkIn()

        expect(log.check_in).toBeDefined()
    })

    it('checkOut completes log with check_out', () => {
        log = checkOut(log)

        expect(log.check_out).toBeDefined()
    })

    it('returns the same log if that log is finished', () => {
        log = checkOut(log)

        expect(log).toEqual(log)
    })
})

describe('getDuration', () => {
    it('exists', () => {
        expect(getDuration).toBeDefined()
    })

    it('returns 0 when nothing is passed', () => {
        const expectedResult = 0
        const actualResult = getDuration()

        expect(actualResult).toEqual(expectedResult)
    })

    it('returns 0 when log is unfinished', () => {
        const log = {
            check_in: '2017-08-26 00:00:00.000',
        }
        const expectedResult = 0
        const actualResult = getDuration(log)

        expect(actualResult).toEqual(expectedResult)
    })

    it('returns 0 when log is unfinished', () => {
        const log = {
            check_out: '2017-08-26 00:00:00.000',
        }
        const expectedResult = 0
        const actualResult = getDuration(log)

        expect(actualResult).toEqual(expectedResult)
    })

    it('returns accurate duration in miliseconds', () => {
        const log = {
            check_in: '2017-08-26 00:00:00.000',
            check_out: '2017-08-26 01:00:00.000',
        }
        const expectedResult = 1 * 60 * 60 * 1000 // 1 hour in ms
        const actualResult = getDuration(log)

        expect(actualResult).toEqual(expectedResult)
    })

    it('returns accurate duration in miliseconds when negative', () => {
        const log = {
            check_in: '2017-08-26 02:00:00.000',
            check_out: '2017-08-26 01:00:00.000',
        }
        const expectedResult = -(1 * 60 * 60 * 1000) // 1 hour in ms
        const actualResult = getDuration(log)

        expect(actualResult).toEqual(expectedResult)
    })

    it('getDurationInSeconds returns accurate duration in seconds', () => {
        const log = {
            check_in: '2017-08-26 00:00:00.000',
            check_out: '2017-08-26 01:00:00.000',
        }
        const expectedResult = 1 * 60 * 60 // 1 hour in sec
        const actualResult = getDurationInSeconds(log)

        expect(actualResult).toEqual(expectedResult)
    })
})

