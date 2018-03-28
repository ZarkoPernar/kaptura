import { flattenObject, unflattenObject } from './flattenObject'

const nestedObject = {
    a: {
        b: {
            c: 'c',
        },
    },
    b: 'b',
    c: {
        a: 'a',
    },
}
const flatObject = {
    'a.b.c': 'c',
    b: 'b',
    'c.a': 'a',
}

it('flattenObject', () => {
    expect(flattenObject(nestedObject)).toEqual(flatObject)
})

it('unflattenObject', () => {
    expect(unflattenObject(flatObject)).toEqual(nestedObject)
})
