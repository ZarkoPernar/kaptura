import { toStore, fromStore } from './store.utils'

describe('toStore', () => {
    it('exists', () => {
        expect(toStore).toBeDefined()
    })

    it('returns an object', () => {
        expect(toStore()).toBeDefined()
    })

    it('the object has allIds and its an array', () => {
        expect(
            Array.isArray(toStore().allIds)
        )
        .toEqual(true)
    })

    it('the object has byId and its an object', () => {
        expect(
            toStore().byId.toString()
        )
        .toEqual('[object Object]')
    })

    it('converts passed data allIds has all the ids in an array', () => {
        const data = [{ _id: '1' }, { _id: '2' }]
        const actualResult = toStore(data).allIds
        const expectedResult = ['1', '2']

        expect(actualResult).toEqual(expectedResult)
    })

    it('converts passed data byId has the id properties', () => {
        const data = [{ _id: '1' }, { _id: '2' }]
        const actualResult = toStore(data).byId
        const expectedResult = {
            '1': data[0],
            '2': data[1],
        }

        expect(actualResult).toEqual(expectedResult)
    })
})

describe('fromStore', () => {
    it('converts store to array structure', () => {
        const data = {
            byId: {
                '1': { _id: '1' },
                '2': { _id: '2' },
            },
            allIds: ['1', '2'],
        }
        const expectedResult = [{ _id: '1' }, { _id: '2' }]
        const actualResult = fromStore(data)

        expect(actualResult).toEqual(expectedResult)
    })
})
