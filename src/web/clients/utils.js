
export function addClientData(item, client) {
    return {
        ...item,
        client_id: client._id,
        client_name: client.name,
    }
}
