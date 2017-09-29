import appTitle from './appTitle'

let doc = {}

describe('appTitle', () => {

    test('it returns an object', () => {
        const actualResult = appTitle(doc)

        expect(actualResult).toBeDefined()
    });

    test('instance has a setTitle method', () => {
        const actualResult = appTitle(doc)

        expect(actualResult.setTitle).toBeDefined()
    });

    test('setTitle method updates the doc obj', () => {
        const str = 'Hello'
        const instance = appTitle(doc)

        instance.setTitle(str)

        expect(doc.title).toEqual(str)
    });
})
