
export default function activeClass(hash) {
    return Object.keys(hash)
        .filter(key => hash[key])
        .join(' ')
}
