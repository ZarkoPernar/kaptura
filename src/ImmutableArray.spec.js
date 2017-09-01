import ImmutableArray from './ImmutableArray'

describe('clone', () => {
    it('returns an instance of ImmutableArray', () => {
        const arr1 = new ImmutableArray(1, 2, 3)
        const arr2 = arr1.clone()

        expect(arr2 instanceof ImmutableArray).toEqual(true)
    })

    it('returns a new instance', () => {
        const arr1 = new ImmutableArray(1, 2, 3)
        const arr2 = arr1.clone()

        expect(arr1 !== arr2).toEqual(true)
    })
})

describe('push', () => {
    it('returns an instance of ImmutableArray', () => {
        const arr1 = new ImmutableArray(1, 2, 3)
        const arr2 = arr1.push(1)

        expect(arr2 instanceof ImmutableArray).toEqual(true)
    })

    it('returns a new instance with the added element', () => {
        const arr1 = new ImmutableArray(1, 2, 3)
        const arr2 = arr1.push(34)

        expect(arr2.last()).toEqual(34)
    })
})

describe('pop', () => {
    it('returns an instance of ImmutableArray', () => {
        const arr1 = new ImmutableArray(1, 2, 3)
        const arr2 = arr1.pop(1)

        expect(arr2 instanceof ImmutableArray).toEqual(true)
    })

    it('returns a new instance with an element removed from end', () => {
        const arr1 = new ImmutableArray(1, 2, 3)
        const arr2 = arr1.pop()

        expect(arr2.length).toEqual(2)
    })
})


describe('shift', () => {
    it('returns an instance of ImmutableArray', () => {
        const arr1 = new ImmutableArray(1, 2, 3)
        const arr2 = arr1.shift(34)

        expect(arr2 instanceof ImmutableArray).toEqual(true)
    })

    it('returns a new instance with an length one more', () => {
        const arr1 = new ImmutableArray(1, 2, 3)
        const arr2 = arr1.shift(34)

        expect(arr2.length).toEqual(4)
    })

    it('returns a new instance with the element appended at the start', () => {
        const el = {}
        const arr1 = new ImmutableArray(1, 2, 3)
        const arr2 = arr1.shift(el)

        expect(el === arr2.first()).toEqual(true)
    })
})
