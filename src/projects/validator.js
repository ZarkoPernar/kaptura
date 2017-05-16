
export default function validate(project) {
    if (!project.name) {
        throw Error('Project must have a valid name!')
    }
}
