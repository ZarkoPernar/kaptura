export function addProjectToItem(item, project) {
    return {
        ...item,
        project_id: project._id,
        project_name: project.name,
    }
}

export function addClientFromProjectToItem(item, project) {
    return {
        ...item,
        client_id: project.client_id,
        client_name: project.client_name,
    }
}
