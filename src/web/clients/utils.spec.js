import { addClientData } from './utils'

test('addClientData exists', () => {
    expect(addClientData).toBeDefined()
})

test('addClientData returns a new object with fields added', () => {
    const initialItem = {
        test: 1,
        hello: 'world',
    }
    const client = {
        _id: 34,
        name: 'Test 34',
    }
    const expectedResult = {
        ...initialItem,
        client_id: 34,
        client_name: 'Test 34',
    }
    const actualResult = addClientData(initialItem, client)

    expect(actualResult).toEqual(expectedResult)
})
