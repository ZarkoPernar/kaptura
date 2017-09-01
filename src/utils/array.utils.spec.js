import { findByIdAndReplace } from './array.utils'

test('returns a the same array if there is nothing to update', () => {
    const array = []
    const expectedResult = array
    const actualResult = findByIdAndReplace(array, {})

    expect(expectedResult === actualResult).toEqual(true)
})

test('returns a new instance if there is something to update', () => {
    const array = [{_id: 1}]
    const expectedResult = array
    const actualResult = findByIdAndReplace(array, {_id: 1})

    expect(expectedResult !== actualResult).toEqual(true)
})

test('returns an array with the same length after update', () => {
    const array = [{ _id: 1, name: 1 }]
    const expectedResult = array
    const actualResult = findByIdAndReplace(array, { _id: 1, name: 2 })

    expect(actualResult.length).toEqual(expectedResult.length)
})

test('updates the element with the same _id', () => {
    const array = [{ _id: 1, name: 1 }]
    const expectedResult = 2
    const updatedArray = findByIdAndReplace(array, { _id: 1, name: expectedResult })
    const actualResult = updatedArray[0].name

    expect(actualResult).toEqual(expectedResult)
})

