export function addProjectToItem(item, project) {
    return {
        ...item,
        project_id: project._id,
        project_name: project.name,
    }
}
