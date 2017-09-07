import { createStoreItem } from './createStoreItem'


test('returns an object', () => {
    const actualResult = createStoreItem('test')

    expect(actualResult).toBeDefined()
})

test('throws when no name', () => {
    expect(() => {
        createStoreItem()
    }).toThrow()
})

test('has actions property', () => {
    const actualResult = createStoreItem('test')

    expect(actualResult.actions).toBeDefined()
})

test('has actions object, and reducer function', () => {
    const expectedResult = expect.objectContaining({
        actions: expect.any(Object),
        reducer: expect.any(Function),
    })
    const actualResult = createStoreItem('test')

    expect(actualResult).toEqual(expectedResult)
})

