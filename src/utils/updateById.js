export default function updateById(item, items) {
    const index = items.findIndex(p => p._id === item._id)

    return [
        ...items.slice(0, index),
        {
            ...items[index],
            ...item,
        },
        ...items.slice(index + 1),
    ]
}
