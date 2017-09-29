import { addProjectToItem } from './utils'

test('addProjectToItem exists', () => {
    expect(addProjectToItem).toBeDefined()
})

test('addProjectToItem returns a new object with fields added', () => {
    const initialItem = {
        test: 1,
        hello: 'world',
    }
    const project = {
        _id: 34,
        name: 'Test 34',
    }
    const expectedResult = {
        ...initialItem,
        project_id: 34,
        project_name: 'Test 34',
    }
    const actualResult = addProjectToItem(initialItem, project)

    expect(actualResult).toEqual(expectedResult)
})
