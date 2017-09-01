let instance
let doc

export default function getAppTitleService(d) {
    if (instance !== undefined) return instance

    doc = d

    instance = {
        setTitle(val) {
            doc.title = val
        }
    }

    return instance
}
