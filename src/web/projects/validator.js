
export default function validate(project) {
    if (!project.name) {
        throw Error('Projekt mora imati ime')
    }
}
