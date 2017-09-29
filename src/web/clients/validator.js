
export default function validate(client) {
    if (!client.name) {
        throw Error('Client must have a valid name!')
    }
}
