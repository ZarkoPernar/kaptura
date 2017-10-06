import { Observable } from 'rxjs/Observable'

export function mapCollection(querySnapshot) {
    const data = []

    querySnapshot.forEach(function (doc) {
        const item = doc.data()

        item._id = doc.id

        data.push(item)
    })

    return data
}

export function createWatchCollection(collection) {
    return Observable.create(function (observer) {
        collection.onSnapshot(function (snapshot) {
            snapshot.docChanges.forEach(function (change) {
                observer.next(change)
            })
        })
    })
}

export function getDataFromDocument(doc) {
    const item = doc.data()
    item._id = doc.id

    return item
}
